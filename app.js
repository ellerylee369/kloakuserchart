//have to compile with tsc first, then run node app.js
//in this format "node app.js <username> <password>"
const fs = require('fs');
const pgp = require('pg-promise')();
const Chart = require('chart.js');
const express = require('express');
var path = require('path');
const app = express();
const port = 3000;
var dateString_array = [];
var number_of_users_array = [];
const db_connect = {
    host: 'localhost',
    port: 5432,
    database: 'kloakuser',
    user: process.argv[2],
    password: process.argv[3],
    max: 30,
};
const db = pgp(db_connect);
//uses SQL queries to search for the specified from database
//stores and strips the time section away from the data
//shows output in 'date  Month(in words)  year format followed by 
//number of users.  This helps to verify the data is indeed present.
let query = 'select date, number_of_users from totaluser';
let kloak_user_data = [];
kloak_user_data = db.each(query, [], (totaluser) => {
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
    dateString_array.push(dateString);
    number_of_users_array.push(number_of_users);
    console.log(dateString_array);
    console.log(number_of_users_array);
    return [dateString_array, number_of_users_array];
}).catch(error => console.error('database query failed. \n Must enter username and password with node arguments'));
//Using chart.js to visualize the data
let _html = "<script src=https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.js></script>" +
    "<canvas id ='KloakUserChart' width='600' height='400'></canvas>" +
    "<script>" +
    "var ctx = document.getElementById('KloakUserChart');" +
    "var Kloak_User_Chart = new Chart(ctx, {" +
    "type: 'line'," +
    "data : {" +
    "labels:" + kloak_user_data[0] + ", " +
    "datasets: [{" +
    "fill: false," +
    "borderColor: 'rgb(255,99,132)'," +
    "data :" + kloak_user_data[1] + " , " +
    "}]" +
    "}," +
    "options: {" +
    "responsive: true," +
    "title: {" +
    "display: true," +
    "text: 'Kloak platform total users'" +
    "}," +
    "scales : {" +
    "xAxes : [{" +
    "display: true," +
    "scaleLabel: {" +
    "display: true," +
    "labelString: 'Month'" +
    "}" +
    "}]," +
    "yAxes : [{" +
    "ticks: {" +
    "min: 0," +
    "max: 100," +
    "stepSize: 10" +
    "}," +
    "display: true," +
    "scaleLabel: {" +
    "display: true," +
    "labelString: 'Number of total users'" +
    "}," +
    "}," +
    "]," +
    "}," +
    "}," +
    "});" +
    "</script>";
//app.engine('html', require('ejs').renderFile)
app.use(express.static('public'));
//app.set('view engine', 'ejs')
app.get('/', async (req, res) => {
    res.send(_html);
});
app.listen(port, () => {
    console.log('Listening on port', port);
});
