import { BaseStreamrFileMetadata, LocalStreamrFileMetadata, StorageInterface } from "./Storage";
export declare class MemoryStorage implements StorageInterface {
    baseData: {
        [hash: string]: BaseStreamrFileMetadata;
    };
    localData: {
        [hash: string]: LocalStreamrFileMetadata;
    };
    constructor();
    get(hash: string): Promise<LocalStreamrFileMetadata>;
    set(metadata: BaseStreamrFileMetadata, data: string): Promise<LocalStreamrFileMetadata>;
    remove(hash: string): Promise<void>;
    clear(): Promise<void>;
}
