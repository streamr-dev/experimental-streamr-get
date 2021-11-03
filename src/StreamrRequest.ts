import StreamrClient, {Stream} from "streamr-client"
import {v4 as uuidv4} from "uuid"
import { EventEmitter } from 'events'
import * as md5File from 'md5-file'
import { keccak256 } from "js-sha3"

export type MessageType = 'request' | 'reply' | 'fulfilled'

export type StorageMessage = { 
    hash: string, 
    type: MessageType, 
    data?: any
}

export class StreamrRequest extends EventEmitter{

    client: StreamrClient
    stream?: Stream
    pendingRequests: { [key: string]: Function /* promise.resolve */ } = {}

    dataStorage: { [url: string]: any } = {}

    constructor(
        client: StreamrClient,
        streamId: string
    ){
        super()
        this.client = client 
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
                this.pendingRequests[message.hash](message)
            }
        })
        this.emit('ready')
    }

    onRequest(message: StorageMessage): boolean{
        if (this.dataStorage[message.hash]){
            this.stream?.publish({ 
                hash: message.hash,
                type: 'reply',
                data: this.dataStorage[message.hash] 
            })
            return true
        }
        return false
    }

    req(hash: string): Promise<any> {
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
}