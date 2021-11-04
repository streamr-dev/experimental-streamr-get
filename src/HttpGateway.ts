import express from 'express'
import StreamrClient from 'streamr-client'
import { StreamrGet } from './StreamrGet'

export class HttpGateway {
    port: number
    getter: StreamrGet

    constructor(
        privateKey: string,
        streamId: string,
        port: number
    ){
        this.getter = new StreamrGet(privateKey, streamId)
        this.port = port

        this.listen()
    }
    
    listen(){
        const app = express()
        app.get('/:fileHash', (req, res) => {
            const hash = req.params.fileHash
            this.getter.get(hash).then(file => {
                res.send(file)
            })
        })
        
        app.listen(this.port, () => {
            console.log(`Streamr Request HTTP Gateway listening on port ${this.port}`)
        })
    }


}