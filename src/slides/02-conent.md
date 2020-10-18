## NodeJS

- JS runtime
- Based on V8
- Rich internal libraries
- Rich opensource package ecosystem

--------

## Getting Started

### Latest Version alignment

```sh

$ [sudo] npm i -g npm
$ [sudo] npm i -g n

$ n latest
$ node --version
v14.14.0

$ npm --version
6.14.8
```

----------

## Package Management

```sh
npm init
```

---------

## Package.json

```json
{
  "name": "package name",
  "description": "Package description",
  "version": "2.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },  
  "dependencies": {
    "npm-name": "major.minor.patch"
  },
  "devDependencies": {
    "@types/node": "^14.11.10",
  },
  "author": "John Snow <johnsnow@winterfell.com>",
  "keywords": [],
  "license": "MIT"
}
```

--------

## Ex1: Create File Script

Lets wrte a script that writes prime numbers between 2 and 100 to a file node's `fs` library

--------

## Passing input to scripts

```ts
console.log(process.argv)
```

Change the script to accept minimum and maximum numbers

--------

## Glob Variables

- `__dirname`
- `__filename`
- `process`
- `require`
- `setTimout`, `setInterval`
- `setImmediate`
- `global`
  
------

## EventEmitter

```javascript
const myEmitter = new MyEmitter();
// Only do this once so we don't loop forever
myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // Insert a new listener in front
    myEmitter.on('event', () => {
      console.log('B');
    });
  }
});
myEmitter.on('event', () => {
  console.log('A');
});
myEmitter.emit('event');
// Prints:
//   B
//   A
```
------

## HTTP

Simple Server

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.end();
});
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);
```

------

## HTTP.request

```js
const postData = querystring.stringify({
  'msg': 'Hello World!'
});

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();
```

-------

## Net

```js
const server = net.createServer((socket) => {
  socket.end('goodbye\n');
}).on('error', (err) => {
  // Handle errors here.
  throw err;
});

// Grab an arbitrary unused port.
server.listen(() => {
  console.log('opened server on', server.address());
});
```

-------

## Exercise

1. Create a restful HTTP server for the resource `user`
1. Create a client to test the endpoints

-------

# Working with NPM Modules

[https://www.npmjs.com/](https://www.npmjs.com/)

-------

## Common packages

- `lodash` - Javascript utility library
- `axios` - http client
- `commander` - a tool for building cli
- `express` - web framework
- `dotenv` - loads variables from `.env` files
- `config` - configurations manager

-------

## Exercise

Write a CLI that:
1. Fetches a remote file from a URI
2. Encripts it's content
3. Saves the encripted file to the disk
4. Decrypts a file

Use any NPM module or Node library you want