import StreamrClient, {Stream} from "streamr-client"
import {v4 as uuidv4} from "uuid"
import { EventEmitter } from 'events'
import * as md5File from 'md5-file'
import { keccak256 } from "js-sha3"
import { MemoryStorage } from "./storage/MemoryStorage"
import { Wallet } from "ethers"
import { 
    getHash,
    BaseStreamrFileMetadata, 
    LocalStreamrFileMetadata 
} from "./storage/Storage"

export type MessageType = 'request' | 'reply' | 'fulfilled'

export type StorageMessage = { 
    hash: string, 
    type: MessageType, 
    data?: any
}

export class StreamrGet extends EventEmitter{

    client: StreamrClient
    wallet: Wallet
    stream?: Stream
    pendingRequests: { [key: string]: Function /* promise.resolve */ } = {}

    dataStorage: MemoryStorage = new MemoryStorage()

    constructor(
        privateKey: string,
        streamId: string
    ){
        super()
        this.client = new StreamrClient({
            auth: {
                privateKey: privateKey,
            },
        }) 
        this.wallet = new Wallet(privateKey)
        this.setStream(streamId)
    }

    private async setStream(streamId: string){
        this.stream = await this.client.getStream(streamId)

        this.client.subscribe(this.stream.id, (message:StorageMessage) => {
            if (message.type === 'request'){
                this.onRequest(message)
            }

            if (message.type === 'fulfilled'){
                // the requester notified us that the request has been fulfilled, do nithing
                
            }

            if (message.type === 'reply' && this.pendingRequests[message.hash]){
                // the requester replied to our request, store the data
                this.pendingRequests[message.hash](message.data)
            }
        })
        this.emit('ready')
    }

    async onRequest(message: StorageMessage): Promise<boolean>{
        const file = await this.dataStorage.get(message.hash)
        if (file){
            this.stream?.publish({ 
                hash: message.hash,
                type: 'reply',
                data: file
            })
            return true
        }
        return false
    }

    get(hash: string): Promise<LocalStreamrFileMetadata> {
        return new Promise((resolve, reject) => {
            try {
                this.pendingRequests[hash] = resolve
                const fn = () => {
                    this.stream?.publish({ hash, type: 'request'})
                }
                if (!this.stream){
                    this.once('ready', () => {
                        fn()
                    })
                    return
                }
                fn()
            } catch (e){
                reject(e)
            }
        })
    }
    
    public async set(data: any): Promise<LocalStreamrFileMetadata>{
        const jsonData = JSON.stringify(data)
        const hash = getHash(jsonData)
        const signature = await this.wallet.signMessage(hash)
        const metadata = {
            hash,
            signature,
            timestamp: Date.now(),
            size: jsonData.length,
        } as BaseStreamrFileMetadata
        
        const extended = await this.dataStorage.set(metadata, jsonData)
        return extended
    }
}