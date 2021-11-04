# EXPERIMENTAL StreamrGet 
Library to request and deliver files and information over the Streamr network

## Install
```
$ npm install
``` 

## Run the tests 
The example usage for this library can be seen under `test/StreamrGet.test.ts`
```
$npm run test
```

## HTTP Gateway
You can see the example usage of the gateway under `test/HttpGateway.test.ts`. The following snippet will start an example gateway with the configuration found under `scripts/start-gateway.js`. By default it will start on port `5050` and it will retrieve files delivered to the url `http://localhost:5050/{FILE_HASH}`
```
$ npm start
```