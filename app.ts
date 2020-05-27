//have to compile with tsc first, then run node app.js
//in this format "node app.js <username> <password>"

const pgp = require('pg-promise')()
const Chart = require('chart.js')
const express = require('express.js')


const db_connect = {
    host: 'localhost',
    port: 5432,
    database: 'kloakuser',
    user: process.argv[2],
    password: process.argv[3],
    max: 30,
    

}

const db = pgp(db_connect)

//uses SQL queries to search for the specified from database
//stores and strips the time section away from the data
//shows output in 'date  Month(in words)  year format followed by 
//number of users.  This helps to verify the data is indeed present.
let query = 'select date, number_of_users from totaluser'

let kloak_user_data = db.each(query, [], (totaluser:Totaluser) => {
    const date = totaluser.date
    const date_number = date.getDate()
    const date_month = date.getMonth()
    const date_year = date.getFullYear()
    let monthWords: string[] = [
        "January", "February", "March", "April", "May", "June", "July",
        "September", "October", "November", "December"
    ]
    const dateString = date_number + " " + monthWords[date_month] + " " + date_year
    const number_of_users = totaluser.number_of_users
    console.log(dateString + ' - ' + number_of_users)
    return [dateString, number_of_users]

    

}).catch(error => console.error('database query failed. \n Must enter username and password with node arguments'))

//Using chart.js to visualize the data
var Kloak_User_Charts = <HTMLCanvasElement>document.getElementById('KloakUserChart')
var ctx = Kloak_User_Charts.getContext('2d')
var Kloak_User_Chart = new Chart(ctx, {
    type: 'line',
    data : {
        labels: kloak_user_data[0],
        dataset: [{
            backgroundColor: "#002f8a",
            borderColor: "#002f8a",
            data : kloak_user_data[1],
        }],
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Kloak platform total users'
            },
            scales : {
                xAxes : [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes : [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of total users'
                    }
                }]
            }
        }



    
        

        

    }
})
