import express from 'express'
import { StreamrRequest } from './StreamrRequest'

export class HttpGateway {
    port: number
    request: StreamrRequest

    constructor(
        privateKey: string,
        streamId: string,
        port: number
    ){
        this.request = new StreamrRequest(privateKey, streamId)
        this.port = port

        this.listen()
    }
    
    listen(){
        const app = express()
        app.get('/:fileHash', (req, res) => {
            const hash = req.params.fileHash
            this.request.get(hash).then(file => {
                res.send(file)
            })
        })
        
        app.listen(this.port, () => {
            console.log(`Streamr Request HTTP Gateway listening on port ${this.port}`)
        })
    }


}