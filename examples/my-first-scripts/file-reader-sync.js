const fs = require('fs');

const data = fs.readFileSync(__filename, 'utf-8')

console.log(data);
