"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStorage = void 0;
const Storage_1 = require("./Storage");
class MemoryStorage {
    constructor() {
        this.baseData = {};
        this.localData = {};
    }
    get(hash) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.localData[hash]);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    set(metadata, data) {
        return new Promise((resolve, reject) => {
            try {
                this.baseData[metadata.hash] = metadata;
                const location = `localhost/${metadata.hash}`;
                const extended = (0, Storage_1.extendMetadata)(metadata, location, data);
                this.localData[metadata.hash] = extended;
                resolve(extended);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    remove(hash) {
        return new Promise((resolve, reject) => {
            try {
                delete this.localData[hash];
                delete this.baseData[hash];
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    clear() {
        return new Promise((resolve, reject) => {
            try {
                this.localData = {};
                this.baseData = {};
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.MemoryStorage = MemoryStorage;
//# sourceMappingURL=MemoryStorage.js.map