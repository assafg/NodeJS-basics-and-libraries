const { parse } = require('./parser');

parse('../../package-lock.json')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
