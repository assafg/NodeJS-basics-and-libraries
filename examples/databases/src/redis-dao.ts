import { createClient, RedisClient, print } from 'redis';
const client:RedisClient = createClient();

client.on('error', function(error: Error) {
    console.error(error);
});

client.set('key', 'value', print);
client.get('key', print);

