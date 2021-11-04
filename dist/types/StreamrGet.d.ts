/// <reference types="node" />
import StreamrClient, { Stream } from "streamr-client";
import { EventEmitter } from 'events';
import { MemoryStorage } from "./storage/MemoryStorage";
import { Wallet } from "ethers";
import { LocalStreamrFileMetadata } from "./storage/Storage";
export declare type MessageType = 'request' | 'reply' | 'fulfilled';
export declare type StorageMessage = {
    hash: string;
    type: MessageType;
    data?: any;
};
export declare class StreamrGet extends EventEmitter {
    client: StreamrClient;
    wallet: Wallet;
    stream?: Stream;
    pendingRequests: {
        [key: string]: Function;
    };
    dataStorage: MemoryStorage;
    constructor(privateKey: string, streamId: string);
    private setStream;
    onRequest(message: StorageMessage): Promise<boolean>;
    get(hash: string): Promise<LocalStreamrFileMetadata>;
    set(data: any): Promise<LocalStreamrFileMetadata>;
}
