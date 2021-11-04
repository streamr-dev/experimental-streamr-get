"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpGateway = void 0;
const express_1 = __importDefault(require("express"));
const StreamrGet_1 = require("./StreamrGet");
class HttpGateway {
    constructor(privateKey, streamId, port) {
        this.getter = new StreamrGet_1.StreamrGet(privateKey, streamId);
        this.port = port;
        this.listen();
    }
    listen() {
        const app = (0, express_1.default)();
        app.get('/:fileHash', (req, res) => {
            const hash = req.params.fileHash;
            this.getter.get(hash).then(file => {
                res.send(file);
            });
        });
        app.listen(this.port, () => {
            console.log(`Streamr Request HTTP Gateway listening on port ${this.port}`);
        });
    }
}
exports.HttpGateway = HttpGateway;
//# sourceMappingURL=HttpGateway.js.map