const fs = require('fs');
const { promisify } = require('util');

const reader = promisify(fs.readFile);

(async function(){
    try {
        const data = await reader(__filename, 'utf-8')
        console.log(data);
            
    } catch (error) {
        console.log(err);
    }   
})()


