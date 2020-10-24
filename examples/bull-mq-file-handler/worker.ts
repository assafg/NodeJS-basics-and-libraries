import { Worker, Job } from 'bullmq';
import { existsSync, mkdirSync } from 'fs';
import { rm } from 'fs/promises';
import { resolve } from 'path';
const { createGzip } = require('zlib');
const { pipeline } = require('stream');
const { createReadStream, createWriteStream } = require('fs');
const { promisify } = require('util');

import queueName from './queue-name';
import redisConnection from './redis-connection';

const pipe = promisify(pipeline);

if (!existsSync('./archive')) {
    mkdirSync('./archive');
}
const worker = new Worker(
    queueName,
    async (job: Job) => {
        const { path, fileName } = job.data;
        const gzip = createGzip();
        const source = createReadStream(path);
        const destination = createWriteStream(
            resolve('./archive', `${fileName}.gz`)
        );
        await pipe(source, gzip, destination);

        await rm(job.data.path, {
            retryDelay: 100,
            maxRetries: 3,
        });
    },
    redisConnection
);

worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});
