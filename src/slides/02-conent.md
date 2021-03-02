## NodeJS

- JS runtime
- Based on V8
- Rich internal libraries
- Rich opensource package ecosystem

--------

## The event loop

![Event loop](./event-loop.jpg)

----

## Getting Started

----
### Latest Version alignment

```sh

$ [sudo] npm i -g npm
$ [sudo] npm i -g n

$ n latest
$ node --version
v14.16.0

$ npm --version
6.14.11
```

----------

# Node Core Libraries

* Globals
* Events
* FS
* HTTP

----------

## Globals

- `__dirname`
- `__filename`
- `process`
- `setTimout`, `setInterval`
- `setImmediate`
- `exports`
- `require`
- `global`

----------
## Events 

The base of Node's asyn core is based on events

```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', function(payload) => {
  console.log('an event occurred!', payload);
});

setInterval(() => myEmitter.emit('event'), 1000)

```
-------

## Event Emitter

Write an observable object that notifies registered function when the object is changed

-------
## File System (FS)

FS operations with both syncronous and asyncronous APIs

Provide all basic capabilities such as:

- create a directory
- write/read files
- rename
- link
- append

--------
# Getting to know the FS library

## mkdir

Create a directory called 'books'. make sure that:

1. The directory is created where you want it
2. The operation doesn't fail when re-running the script


## writeFile

write `this is my book` into a file called `book1.md` inside `books` directory
 
## readFile
read the content of `book1.md` and print it

## appendFile
append a new line to the `book1.md` file

## rm
Delete the directory (and file)

--------

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

## Exercise

1. Create a restful HTTP server for the resource `user`
1. Create a client to test the endpoints

--------

# Working with Dependencies

--------

## Package Management

```sh
npm init
```

--------

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
  "author": "John Snow <johnsnow@winterfell.com>",
  "keywords": [],
  "license": "MIT"
}
```

--------

## Passing input to scripts

```ts
console.log(process.argv)
```
  
--------

# Working with NPM Modules

[https://www.npmjs.com/](https://www.npmjs.com/)

--------

## Common packages most projects use

- `lodash` - Javascript utility library
- `axios` - http client
- `commander` - a tool for building cli
- `express` - web framework
- `dotenv` - loads variables from `.env` files
- `config` - configurations manager

--------

## Exercise

Write a CLI that:

1. Fetches a remote file from a URI
2. Encripts it's content
3. Saves the encripted file to the disk
4. Decrypts a file

Use any NPM module or Node library you want