import { Wallet } from "ethers";
export interface StorageInterface {
    baseData: {
        [hash: string]: BaseStreamrFileMetadata;
    };
    localData: {
        [hash: string]: LocalStreamrFileMetadata;
    };
    get(hash: string): Promise<LocalStreamrFileMetadata>;
    set(metadata: BaseStreamrFileMetadata, data: string): Promise<LocalStreamrFileMetadata>;
    remove(hash: string): Promise<void>;
    clear(): Promise<void>;
}
export interface BaseStreamrFileMetadata {
    timestamp: number;
    size: number;
    hash: string;
    signature: string;
}
export interface LocalStreamrFileMetadata extends BaseStreamrFileMetadata {
    location: string;
    data: string;
}
export declare const getHash: (data: string) => string;
export declare const getFileHash: (filePath: string) => string;
export declare const getFileMetadata: (wallet: Wallet, filePath: string) => Promise<BaseStreamrFileMetadata>;
export declare const extendMetadata: (metadata: BaseStreamrFileMetadata, location: string, data: string) => LocalStreamrFileMetadata;
