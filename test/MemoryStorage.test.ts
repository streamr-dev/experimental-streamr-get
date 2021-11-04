import { expect } from 'chai'
import { it, describe } from "mocha"
import { MemoryStorage } from '../src/storage/MemoryStorage'
import { BaseStreamrFileMetadata } from '../src/storage/Storage'

describe('MemoryStorage', () => {
    const storage = new MemoryStorage()
    const metadata = {
        hash: 'hash',
        signature: 'signature',
        timestamp: Date.now(),
        size: 100
    } as BaseStreamrFileMetadata

    const data = JSON.stringify({foo: 'bar'})
   
    it ('set, happy-path', async () => {
        const extended = await storage.set(metadata, data)
        
        expect(storage.baseData[metadata.hash])
        .to.deep.equal(metadata)
        expect(storage.localData[metadata.hash])
        .to.deep.equal(extended)
    })

    it ('get, happy-path', async () => {
        const extended = await storage.get(metadata.hash)
        expect(extended).to.deep
        .equal(storage.localData[metadata.hash])
    })

    it ('get, not found', async () => {
        const _metadata = await storage.get('not-found')
        expect(_metadata).to.be.undefined
    })

    it ('remove, happy-path', async () => {
        await storage.remove(metadata.hash)
        //expect(storage.dataStorage[metadata.hash]).to.be.undefined
    })

    it ('remove, not found', async () => {
        const res = await storage.remove('not-found')
        expect(res).to.be.undefined
    })

    it ('clear, happy-path', async () => {
        await storage.clear()
        //expect(storage.dataStorage).to.deep.equal({})
    })
})