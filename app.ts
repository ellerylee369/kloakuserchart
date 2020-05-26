const pgp = require('pg-promise')();
const yargs = require('yargs');
import type {Totaluser} from "./interfaces";

const db_connect = {
    host: 'localhost',
    port: 5432,
    database: 'kloakuser',
    user: 'postgres',
    password: 'Flandrewaifu_1',
    max: 30,
    

}

const db = pgp(db_connect);

let query = 'select date, number_of_users from totaluser';

db.each(query, [], (totaluser:Totaluser) => {
    const date = totaluser.date;
    const number_of_users = totaluser.number_of_users;
    console.log(date + ' - ' + number_of_users)

}).catch(error => console.error('database query failed', error))
