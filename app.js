var pgp = require('pg-promise')();
var yargs = require('yargs');
var db_connect = {
    host: 'localhost',
    port: 5432,
    database: 'kloakuser',
    user: 'postgres',
    password: 'Flandrewaifu_1',
    max: 30
};
var db = pgp(db_connect);
var query = 'select date, number_of_users from totaluser';
db.each(query, [], function (totaluser) {
    var date = totaluser.date;
    var number_of_users = totaluser.number_of_users;
    console.log(date + ' - ' + number_of_users);
})["catch"](function (error) { return console.error('database query failed', error); });
