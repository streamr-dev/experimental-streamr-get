import { keccak256 } from "js-sha3"
import { statSync } from 'fs'
import { Wallet } from "ethers"
import * as md5File from 'md5-file'

export interface StorageInterface {
    baseData: { [hash: string]: BaseStreamrFileMetadata }
    localData: { [hash: string]: LocalStreamrFileMetadata }

    get(hash: string): Promise<LocalStreamrFileMetadata>
    set(metadata: BaseStreamrFileMetadata, data: string): Promise<LocalStreamrFileMetadata>
    remove(hash: string): Promise<void>
    clear(): Promise<void>
}

export interface BaseStreamrFileMetadata {
    timestamp: number,
    size: number,
    hash: string,
    signature: string,
}

export interface LocalStreamrFileMetadata extends BaseStreamrFileMetadata{
    location: string,
    data: string
}

export const getHash = (data: string): string => {
    return `0x${keccak256(data)}`
}

export const getFileHash = (filePath: string) => {
    const checksum = md5File.sync(filePath)
    return getHash(checksum)
}

export const getFileMetadata = async (
    wallet: Wallet, 
    filePath: string
): Promise<BaseStreamrFileMetadata> => {
    const hash = getFileHash(filePath)
    const signature = await wallet.signMessage(hash)
    const size = statSync(filePath).size
    const timestamp = Date.now()

    return {
        timestamp,
        size,
        hash,
        signature
    } as BaseStreamrFileMetadata
}

export const extendMetadata = (
    metadata: BaseStreamrFileMetadata,
    location: string,
    data: string
): LocalStreamrFileMetadata => {
    return {
        ...metadata,
        location,
        data
    } as LocalStreamrFileMetadata
}