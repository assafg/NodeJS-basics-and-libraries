import { createConnection, OkPacket } from 'mysql';
import { promisify } from 'util';
const connection = createConnection({
    host: 'localhost',
    database: 'users-db',
    user: 'root',
    password: 'example',
});

console.log('starting');

const connect = promisify(connection.connect).bind(connection);
const query = promisify(connection.query).bind(connection);
async function run(){
    try {
        await connect();
        const results = await query('select * from users');
        console.log('results', results);
        
        const res = await query({
            sql: 'insert into users (username, password) values (?, ?)', 
            values: ['assaf1','1234'],
        }) as OkPacket;
        console.log('insertId', res.insertId);
        
    } catch (error) {
        console.log(error);
    }
}

run();

