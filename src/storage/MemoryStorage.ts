import { BaseStreamrFileMetadata, extendMetadata, LocalStreamrFileMetadata, StorageInterface } from "./Storage";

export class MemoryStorage implements StorageInterface{
    baseData: { [hash: string]: BaseStreamrFileMetadata } = {}
    localData: { [hash: string]: LocalStreamrFileMetadata } = {}

    constructor(){}

    get(hash: string): Promise<LocalStreamrFileMetadata> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.localData[hash])
            } catch (e) {
                reject(e)
            }
        })
    }

    set(metadata: BaseStreamrFileMetadata, data: string): Promise<LocalStreamrFileMetadata> {
        return new Promise((resolve, reject) => {
            try {
                this.baseData[metadata.hash] = metadata
                const location = `localhost/${metadata.hash}`
                const extended = extendMetadata(
                    metadata,
                    location,
                    data
                )
                this.localData[metadata.hash] = extended
                resolve(extended)
            } catch (e) {
                reject(e)
            }
        })
    }

    remove(hash: string): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                delete this.localData[hash]
                delete this.baseData[hash]
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    }

    clear(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.localData = {}
                this.baseData = {}
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    }

}