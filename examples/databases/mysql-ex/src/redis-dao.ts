import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';

const client:RedisClient = createClient();

const set = promisify(client.set).bind(client);
const get = promisify(client.get).bind(client);
const hset = promisify(client.hset).bind(client);
const hget = promisify(client.hget).bind(client);

client.on('error', function(error: Error) {
    console.error(error);
});

(async () => {
    
    const user = {
        id: 123,
        name: 'John',
        age: 35
    };

    hset(['users-' + user.id, 'name', user.name]); 
    hset(['users-' + user.id, 'age', user.age + '']); 
    
    const result2 = await get('my-sectret') as string;
    const obj = JSON.parse(result2)
    console.log(obj);
    
})()
