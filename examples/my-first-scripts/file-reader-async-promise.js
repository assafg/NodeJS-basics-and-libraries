const fs = require('fs');
const { promisify } = require('util');

const reader = promisify(fs.readFile);

reader(__filename, 'utf-8')
.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});


