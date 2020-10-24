const { Worker, isMainThread, workerData } = require('worker_threads');

if (isMainThread) {
    const worker = new Worker(__filename, { workerData: 'Hello, world!' });
    console.log('started worker');
} else {
    for(let i=0; i<10000; i++){
        const root = Math.sqrt(i);
        console.log(root);
    }
    console.log(workerData);  // Prints 'Hello, world!'.
}