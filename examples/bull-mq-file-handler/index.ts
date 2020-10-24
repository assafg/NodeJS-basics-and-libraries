import { Queue } from 'bullmq';
import { watch, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import queueName from './queue-name';
import redisConnection from './redis-connection';
import './worker';

// Create a new connection in every instance
const q = new Queue(queueName, redisConnection);

if (!existsSync('./files')) {
    mkdirSync('./files');
} 
watch('./files', { encoding: 'utf-8' }, (eventType, fileName) => {
    if (fileName) {
        console.log('eventType', eventType);
        q.add('archiveJob', { path: resolve('./files', fileName), fileName })
    }
});

