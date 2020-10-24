const {
    Worker,
    isMainThread,
    parentPort,
    workerData,
} = require('worker_threads');

if (isMainThread) {
    module.exports.parse = function parseJSAsync(pathToFile) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: pathToFile,
            });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', code => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    };
} else {
    const { readFileSync } = require('fs');
    const lockfile = readFileSync(workerData);
    const lockFileObject = JSON.parse(lockfile);
    parentPort.postMessage(lockFileObject);
}

