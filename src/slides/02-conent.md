## Child Process

- `child_process.exec()`: spawns a shell and runs a command within that shell, passing the stdout and stderr to a callback function when complete.
- `child_process.execFile()`: similar to child_process.exec() except that it spawns the command directly without first spawning a shell by default.
- `child_process.fork()`: spawns a new Node.js process and invokes a specified module with an IPC communication channel established that allows sending messages between parent and child.
- `child_process.execSync()`: a synchronous version of child_process.exec() that will block the Node.js event loop.
- `child_process.execFileSync()`: a synchronous version of child_process.execFile() that will block the Node.js event loop.

----------

## Example Spawn

```js
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

----------

## Example Fork

```js
// Parent.js
const cp = require('child_process');
const n = cp.fork(`${__dirname}/sub.js`);

n.on('message', (m) => {
  console.log('PARENT got message:', m);
});

// Causes the child to print: CHILD got message: { hello: 'world' }
n.send({ hello: 'world' });

//----------------------------
// sub.js
process.on('message', (m) => {
  console.log('CHILD got message:', m);
});

// Causes the parent to print: PARENT got message: { foo: 'bar', baz: null }
process.send({ foo: 'bar', baz: NaN });
```

----------

## Cluster

1. Utilize multiple processors - increases perfoemance
2. Spawn a new process if anything happens
3. easy to manage


-----------

## Using the `Cluster` module

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

--------

## PM2

```md
# Fork mode
pm2 start app.js --name my-api # Name process

# Cluster mode
pm2 start app.js -i 0        # Will start maximum processes with LB depending on available CPUs
pm2 start app.js -i max      # Same as above, but deprecated.
pm2 scale app +3             # Scales `app` up by 3 workers
pm2 scale app 2              # Scales `app` up or down to 2 workers total

# Listing

pm2 list               # Display all processes status
pm2 jlist              # Print process list in raw JSON
pm2 prettylist         # Print process list in beautified JSON

pm2 describe 0         # Display all informations about a specific process

pm2 monit              # Monitor all processes

# Logs

pm2 logs [--raw]       # Display all processes logs in streaming
pm2 flush              # Empty all log files
pm2 reloadLogs         # Reload all logs

# Actions

pm2 stop all           # Stop all processes
pm2 restart all        # Restart all processes

pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)

pm2 stop 0             # Stop specific process id
pm2 restart 0          # Restart specific process id

pm2 delete 0           # Will remove process from pm2 list
pm2 delete all         # Will remove all processes from pm2 list

# Misc

pm2 reset <process>    # Reset meta data (restarted time...)
pm2 updatePM2          # Update in memory pm2
pm2 ping               # Ensure pm2 daemon has been launched
pm2 sendSignal SIGUSR2 my-app # Send system signal to script
pm2 start app.js --no-daemon
pm2 start app.js --no-vizion
pm2 start app.js --no-autorestart
```

-------

### Exercise
Using PM2, run a simple server in cluster mode on all processors

-------

## Worker Thread

1. Same process
2. Shared memory
3. Offload CPU intensive work

```js
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
```

-------

Example: parse file

```js
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

// --- Usage:

const { parse } = require('./parser');

parse('../../package-lock.json')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });


```

-------

## BullMQ (Formerly Bull)

1. A node based job queue framework
2. Backed by Redis
3. Production ready

-------

## BullMQ Workshop

1. Set up a simple worker queue
2. replace the manual job adding with file dir changed (use `watch`)
3. zip and archive the files with a dedicated job worker
4. remove the file from the `source` directory