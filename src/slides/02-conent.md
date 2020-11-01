## MySQL

Option 1: Raw connection with [`mysql`](https://www.npmjs.com/package/mysql)
Option 2: ORM with [`sequelize`](https://sequelize.org/master/manual/getting-started.html)

---------

## Getting started

1. Run a MySQL server
2. Create a `users-db` DB
3. Create a `users` table
4. populate the `users` table

----------

## `mysql`

```ts
import { createConnection, OkPacket } from 'mysql';
import { promisify } from 'util';

const connection = createConnection({
    host: 'localhost',
    database: 'users-db',
    user: 'root',
    password: 'example',
});

const connect = promisify(connection.connect).bind(connection);
const query = promisify(connection.query).bind(connection);
async function run(){
    try {
        await connect();
        const res = await query({
            sql: 'insert into users (username, password) values (?, ?)', 
            values: ['assaf1','1234'],
        }) as OkPacket;
        console.log('insertId', res.insertId);

        const results = await query('select * from users');
        console.log('results', results);

    } catch (error) {
        console.log(error);
    }
}

run();
```

------

## Exercise

1. Insert 1000 records to the users table using [https://mockaroo.com/](https://mockaroo.com/)
2. write a function to get a user by Id
3. Write a function that validates credentials (username & password)
4. write a mechanism to prevent brute force login
   
------

## Redis

```sh
$ npm install redis
$ npm install -D @types/redis
```

```js
import { createClient, RedisClient, print } from 'redis';
const client:RedisClient = createClient();

client.on('error', function(error: Error) {
    console.error(error);
});

client.set('key', 'value', print);
client.get('key', print);
```

[https://redis.io/commands](https://redis.io/commands)

-------

## Exercise

Port the previous exercise to Redis:

Insert 1000 records into redis [https://mockaroo.com/](https://mockaroo.com/)

1. write a function to get a user by Id
2. Write a function that validates credentials (username & password)
3. write a mechanism to prevent brute force login


-------



