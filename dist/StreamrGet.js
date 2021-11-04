"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamrGet = void 0;
const streamr_client_1 = __importDefault(require("streamr-client"));
const events_1 = require("events");
const MemoryStorage_1 = require("./storage/MemoryStorage");
const ethers_1 = require("ethers");
const Storage_1 = require("./storage/Storage");
class StreamrGet extends events_1.EventEmitter {
    constructor(privateKey, streamId) {
        super();
        this.pendingRequests = {};
        this.dataStorage = new MemoryStorage_1.MemoryStorage();
        this.client = new streamr_client_1.default({
            auth: {
                privateKey: privateKey,
            },
        });
        this.wallet = new ethers_1.Wallet(privateKey);
        this.setStream(streamId);
    }
    async setStream(streamId) {
        this.stream = await this.client.getStream(streamId);
        this.client.subscribe(this.stream.id, (message) => {
            if (message.type === 'request') {
                this.onRequest(message);
            }
            if (message.type === 'fulfilled') {
                // the requester notified us that the request has been fulfilled, do nithing
            }
            if (message.type === 'reply' && this.pendingRequests[message.hash]) {
                // the requester replied to our request, store the data
                this.pendingRequests[message.hash](message.data);
            }
        });
        this.emit('ready');
    }
    async onRequest(message) {
        var _a;
        const file = await this.dataStorage.get(message.hash);
        if (file) {
            (_a = this.stream) === null || _a === void 0 ? void 0 : _a.publish({
                hash: message.hash,
                type: 'reply',
                data: file
            });
            return true;
        }
        return false;
    }
    get(hash) {
        return new Promise((resolve, reject) => {
            try {
                this.pendingRequests[hash] = resolve;
                const fn = () => {
                    var _a;
                    (_a = this.stream) === null || _a === void 0 ? void 0 : _a.publish({ hash, type: 'request' });
                };
                if (!this.stream) {
                    this.once('ready', () => {
                        fn();
                    });
                    return;
                }
                fn();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async set(data) {
        const jsonData = JSON.stringify(data);
        const hash = (0, Storage_1.getHash)(jsonData);
        const signature = await this.wallet.signMessage(hash);
        const metadata = {
            hash,
            signature,
            timestamp: Date.now(),
            size: jsonData.length,
        };
        const extended = await this.dataStorage.set(metadata, jsonData);
        return extended;
    }
}
exports.StreamrGet = StreamrGet;
//# sourceMappingURL=StreamrGet.js.map