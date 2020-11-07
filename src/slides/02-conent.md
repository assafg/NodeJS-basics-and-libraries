## Working with Express

- Simple
- Common
- Powerful
- Extensible

--------

## Getting started

```json
{
  "name": "users",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc",
    "start": "nodemon ./out/index.js"
  },
  "keywords": [],
  "author": "Assaf Gannon",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.8",
    "nodemon": "^2.0.6"
  }
}
```

------

## Most basic setup 

```typescript
import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello world')
})

app.listen(3001, () => {
    console.log('app started and listenenig at http://localhost:3001');
})
```

-----

## Express Middleware

- Adds capabilities to the server
- Can be chained
- Order matters


```ts
expressApp.use((req: Request, res: Response, next: NextFunction) => {
    // middleware stuff 

    // call next middleware
    next();
})
```

-----

## Writing our first Middleware

```ts
function logOriginMiddleware(req: Request, res: Response, next: NextFunction){
    console.log(`Got request for ${req.path} from ${req.ip}`);
    next();
}

// ...

app.use(logOriginMiddleware);
```

-----

## Commonly used Middelwares

- 'cookie-parser'
- 'body-parser'
- 'static-conent'
- 'static'
  
```ts
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
```

-----

## Routing - option 1

`app.[METHOD]('path', handlerFn)`

```ts
app.get('/resource', getHandler);
app.post('/resource', postHandler);
app.put('/resource', putHandler);
app.delete('/resource', deleteHandler);
```

-----

## Routing - option 2

```ts
app.route('path')
    .get(getHandler)
    .post(postHandler);
    .put(putHandler);
    .delete(deleteHandler);
```

-----

## Routing - option 3

### express.Router

```ts
// 'user-router.ts'
import express from 'express';
export const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
app.get('/', getHandler);
app.post('/', postHandler);
app.put('/', putHandler);
app.delete('/', deleteHandler);

// ----
// in in main:
import { router } from './user-router';

app.use('/user', router);
```

------

## Rout params

```ts
app.get('/user/:company/:id', (req, res) => {
    const { company, id } = req.params;
});
```

------

## Route handlers

### Single callback

```js
app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})
```

----

## Multiple callbacks

First methods act as middleware for the specific route

```js
app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from B!')
})
```

-----

## Response Methods

| Method | Description
-|-|-
`res.download()`|Prompt a file to be downloaded.
`res.end()`|End the response process.
`res.json()`|Send a JSON response.
`res.jsonp()`|Send a JSON response with JSONP support.
`res.redirect()`|Redirect a request.
`res.render()`|Render a view template.
`res.send()`|Send a response of various types.
`res.sendFile()`|Send a file as an octet stream.
`res.sendStatus()`|Set the response status code and send its string representation as the response body.

------
