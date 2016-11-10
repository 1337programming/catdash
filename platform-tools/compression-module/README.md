## Remo Compression Module

This node module serves to act as a message compression agent between
the UI and micro-service layers. The intent of this module is to reduce
the payload size of HTTP or TCP requests significantly.

As Node is essentially just a C++ library, we can use low level C++
functionality and drive it with JavaScript through the UV and V8
libraries.

This compression module is greatly based on the Google C++ library 
Snappy, with some additions to Snappy and a wrapper for the V8 
engine we can utilize the features of Snappy.

## Setup

* `npm install`
* Import into project `import Compression from 'compression'` or 
require the `compression.js` file however you like

## Usage

UI:

``` js
import Compression from 'compression';

let obj:Object = {'key1' : 'value1', 'key2': 'value2'};
let compressedObj:ArrayBuffer = Compression.compressSync(obj);
// Convert Buffer into ArrayBuffer
this.http.post('http://myapi/endpoint', compressedObj);
```

API:

``` js
import Compression from 'compression';

let data:ArrayBuffer = req.body;
let body:Object = Compression.uncompressSync(data);
console.log(body) // Object: {'key1' : 'value1', 'key2': 'value2'}
```

## Contact

* Patrick Opie `<patrick.opie@t-mobile.com>`
