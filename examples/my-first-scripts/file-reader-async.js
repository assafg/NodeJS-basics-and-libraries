const fs = require('fs');

fs.readFile(__filename, 'utf-8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(data);
})

