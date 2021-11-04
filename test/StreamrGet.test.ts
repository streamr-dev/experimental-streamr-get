import { expect } from 'chai'
import { it, describe } from "mocha"
import { LocalStreamrFileMetadata } from '../src/storage/Storage'
import { StreamrGet } from '../src/StreamrGet'

describe('StreamrGet', () => {
    const privateKey1 = '0xa5c45ab33d5524731616f3b01fc1a9e91cad2abb18958592f00825bf6f1e3dd7'
    const privateKey2 = '0x3f46c16ceadae816a6ffac14c7bc98bddf43241b4b2a3db3684f1913c418181d'

    const streamId = '0x75a34e85d8aA9ff106740f60CB37fEFc2f0deAF9/test-request'
    let request1: StreamrGet
    let request2: StreamrGet
    let extended: LocalStreamrFileMetadata

    before(async () => {
        request1 = new StreamrGet(privateKey1, streamId)
        request2 = new StreamrGet(privateKey2, streamId)
    })
    
    it ('should exercise `set` on request1, happy-path', async () => {
        extended = await request1.set({foo: 'bar'})
        expect(extended.hash).to.equal('0x0c67568ef95afd46944fae1abc2b7d6227aa410e6250a554cbaab0fb17074205')
        expect(extended.signature).to.equal('0xfeb08dd4adf678fb99defeeb2982305750220ed91675c9a8293206b9713c57810acc4e54a1377ac9141cc5ed2e3dec42f70665998de820f4fc9e1026d233ffc91b')
        expect(extended.size).to.equal(13)
        expect(extended.location).to.equal('localhost/0x0c67568ef95afd46944fae1abc2b7d6227aa410e6250a554cbaab0fb17074205')
        expect(extended.data).to.equal('{"foo":"bar"}')
      
    })
    it ('should exercise `get` on request2, happy-path', async () => {
        const fetched = await request2.get(extended.hash)
        expect(fetched.hash).to.equal(extended.hash)
        expect(fetched.size).to.equal(extended.size)
        expect(fetched.location).to.equal(extended.location)
        expect(fetched.data).to.equal(extended.data)
    })
})