import chai, { expect } from 'chai'
import { it, describe } from "mocha"
import { HttpGateway } from '../src/HttpGateway'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

describe('HttpGateway', () => {
    const privateKey = '0x1c4343df92f5370208232782c373fa691c3543bdf4c40adfd406c87103b18fc2'
    const streamId = `0x75a34e85d8aA9ff106740f60CB37fEFc2f0deAF9/test-request`
    const port = 9293

    const gateway = new HttpGateway(
        privateKey,
        streamId,
        port
    )

    const data = {foo: 'bar'}
   
    it ('get, happy-path', async () => {
        const metadata = await gateway.getter.set(data)
        const res = await chai.request(`http://localhost:${port}`).get(`/${metadata.hash}`)
        expect(res.status).to.equal(200)
        expect(res.body.hash).to.equal(metadata.hash)
        expect(res.body.signature).to.equal(metadata.signature)
        expect(res.body.size).to.equal(metadata.size)
        expect(res.body.location).to.equal(metadata.location)
        expect(res.body.data).to.equal(metadata.data)
    })
})