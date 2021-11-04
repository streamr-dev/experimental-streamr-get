"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendMetadata = exports.getFileMetadata = exports.getFileHash = exports.getHash = void 0;
const js_sha3_1 = require("js-sha3");
const fs_1 = require("fs");
const md5File = __importStar(require("md5-file"));
const getHash = (data) => {
    return `0x${(0, js_sha3_1.keccak256)(data)}`;
};
exports.getHash = getHash;
const getFileHash = (filePath) => {
    const checksum = md5File.sync(filePath);
    return (0, exports.getHash)(checksum);
};
exports.getFileHash = getFileHash;
const getFileMetadata = async (wallet, filePath) => {
    const hash = (0, exports.getFileHash)(filePath);
    const signature = await wallet.signMessage(hash);
    const size = (0, fs_1.statSync)(filePath).size;
    const timestamp = Date.now();
    return {
        timestamp,
        size,
        hash,
        signature
    };
};
exports.getFileMetadata = getFileMetadata;
const extendMetadata = (metadata, location, data) => {
    return {
        ...metadata,
        location,
        data
    };
};
exports.extendMetadata = extendMetadata;
//# sourceMappingURL=Storage.js.map