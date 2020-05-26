//have to compile with tsc first, then run node app.js
//in this format "node app.js <username> <password>"
const pgp = require('pg-promise')();
const yargs = require('yargs');
const db_connect = {
    host: 'localhost',
    port: 5432,
    database: 'kloakuser',
    user: process.argv[2],
    password: process.argv[3],
    max: 30,
};
const db = pgp(db_connect);
let query = 'select date, number_of_users from totaluser';
db.each(query, [], (totaluser) => {
    const date = totaluser.date;
    const date_number = date.getDate();
    const date_month = date.getMonth();
    const date_year = date.getFullYear();
    let monthWords = [
        "January", "February", "March", "April", "May", "June", "July",
        "September", "October", "November", "December"
    ];
    const dateString = date_number + " " + monthWords[date_month] + " " + date_year;
    const number_of_users = totaluser.number_of_users;
    console.log(dateString + ' - ' + number_of_users);
}).catch(error => console.error('database query failed. \n Must enter username and password with node arguments'));
