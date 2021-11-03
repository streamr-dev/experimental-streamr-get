import { expect } from 'chai'
import { it, describe } from "mocha"
import StreamrClient, { Stream, StreamOperation } from 'streamr-client'
import { Wallet } from 'ethers'
import { StreamrRequest } from '../src/StreamrRequest'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('StreamrRequest', () => {
    /*
    const privateKey1 = '0xa5c45ab33d5524731616f3b01fc1a9e91cad2abb18958592f00825bf6f1e3dd7'
    const privateKey2 = '0x3f46c16ceadae816a6ffac14c7bc98bddf43241b4b2a3db3684f1913c418181d'
    const streamPrivateKey = '0x1c4343df92f5370208232782c373fa691c3543bdf4c40adfd406c87103b18fc2'

    let client1: StreamrClient
    let client2: StreamrClient
    let requestStream: Stream
    let request1: StreamrRequest
    let request2: StreamrRequest

    before(async () => {
        const client = new StreamrClient({
            auth: {
                privateKey: streamPrivateKey,
            },
        })
        client1 = new StreamrClient({
            auth: {
                privateKey: privateKey1,
            },
        })
    
        client2 = new StreamrClient({
            auth: {
                privateKey: privateKey2
            },
        })
    
        requestStream = await client.getStream(`0x75a34e85d8aA9ff106740f60CB37fEFc2f0deAF9/test-request`)
        // await requestStream.grantPermission(StreamOperation.STREAM_GET, undefined)
        // await requestStream.grantPermission(StreamOperation.STREAM_PUBLISH, undefined)
        // await requestStream.grantPermission(StreamOperation.STREAM_SUBSCRIBE, undefined)

        request1 = new StreamrRequest(client1, requestStream.id)
        request2 = new StreamrRequest(client2, requestStream.id)
    })
    
    it ('should create and fullfill a request with separate clients', async () => {
        const data = {foo: 'bar'}
        const url = 'foo://bar'

        // store the data for the request on client1
        request1.dataStorage[url] = data

        // request the url from the other client
        const fetched = await request2.req(url)

        expect(fetched).to.deep.equal(data)
    })
    */
})