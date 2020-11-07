import { createConnection, OkPacket } from 'mysql';
import { promisify } from 'util';

const connection = createConnection({
    host: 'localhost',
    port: 3306,
    database: 'users-db',
    user: 'root',
    password: 'example',
});

const connect = promisify(connection.connect).bind(connection);
const query = promisify(connection.query).bind(connection);

async function init(){
    try {
        return connect();
        
        // console.log('results', results);
        // connection.end();
    } catch (error) {
        console.log(error);
    }
}

function getById(id: number) { 
    return query({
        sql: 'select * from users where id=?',
        values: [id]
    });
}

(async () => {
    await init();
    const user = await getById(123);
    console.log(user);;
    
})()
