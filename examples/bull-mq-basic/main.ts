import { Queue } from 'bullmq';
import queueName from './queue-name';
import redisConnection from './redis-connection';
import './worker';

// Create a new connection in every instance
const myQueue = new Queue(queueName, redisConnection);

async function addJobs(){
    await myQueue.add('myJobName', { foo: 'bar' });
    await myQueue.add('myJobName', { qux: 'baz' });    
}

(async () => {
    console.log('Adding jobs');
    await addJobs();
    console.log('Added jobs');
})();



