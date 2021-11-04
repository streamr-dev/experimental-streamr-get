const ExperimentalStreamrGet = require('../dist/index.js')
const HttpGateway = ExperimentalStreamrGet.HttpGateway
const server = new HttpGateway(
    '0x1c4343df92f5370208232782c373fa691c3543bdf4c40adfd406c87103b18fc2',
    '0x75a34e85d8aA9ff106740f60CB37fEFc2f0deAF9/test-request',
    5050
)