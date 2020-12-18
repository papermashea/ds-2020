//npm i cheerio
// npm i fs
// npm i pg
// npm i querystring
// npm i request
// npm i async
// npm i dotenv
// npm i node-fetch
//npm i esformatter

const {Client} = require('pg'),
    fs = require('fs'),
    cheerio = require('cheerio'),
    querystring = require('querystring'),
    request = require('request'),
    async = require('async'),
    dotenv = require('dotenv'),
    fetch = require("node-fetch");

"use strict"

// LOAD JSON OBJECT
let meetingData = fs.readFileSync('data/geo-json/types/10.json');

let allMeetings = JSON.parse(meetingData);
// console.log(allMeetings);
// console.log(allMeetings.length);

// // AWS RDS POSTGRESQL INSTANCE
dotenv.config(); 

let db_credentials = {
    host: process.env.AWSRDS_HT, // ENDPOINT FROM RDW AWS CONSOLE
    database: process.env.AWSRDS_DB,
    user: 'ds2020',
    password: process.env.AWSRDS_PW,
    port: 5432,
};

// // CONNECT TO AWS RDS POSTGRES DB
// const client = new Client(db_credentials);
// client.connect();


// // // CREATE TABLE WITH LISTED COLUMNS:

// // let query = `DROP TABLE aameetingsNY`


// let query = `CREATE TABLE aameetingsNY (
//   title varchar(200),
//   venue varchar(200),
//   type varchar(20),
//   address varchar(2000),
//   lat double precision,
//   long double precision,
//   day varchar(60),
//   startTime varchar(20),
//   endTime varchar(20)
// );`;

// client.query(query, (err, res) => {
//     if (err){ throw (err); }

//     console.log(res);
//     client.end();
// });



// ASYNC MODULE LOOPS THROUGH DATA TO PUT INTO TABLE
// async.eachSeries(allMeetings, function(meeting, callback) {
//     let client = new Client(db_credentials); // CONNECT TO DB
//     client.connect();

//     // console.table(allMeetings[1]);
//     // VARIABLES BECOME VALUES IN AN ARRAY
//     let query = {
//       text: "INSERT INTO aameetingsNY VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
//       values: [meeting.title, meeting.venue, meeting.types, meeting.streetAddress, meeting.lat, meeting.long, meeting.days, meeting.startTime, meeting.endTime]
//     };

//     client.query(query, (err, res) => {
//         if (err){ throw err; }
        
//         // console.log(res);
//         client.end();
//     // console.log('All done with ' + allMeetings.length + ' meetings');
//     });
//     setTimeout(callback, 1000);
// });

// console.log('All done with ' + allMeetings.length + ' meetings');


// CHECK YOUR WORK
// Sample SQL statement to query the entire contents of a table: 

const client = new Client(db_credentials);
client.connect();

// let query = "SELECT * FROM aameetingsNY;";
let query = "SELECT COUNT (*) FROM aameetingsNY;";


client.query(query, (err, res) => {
    if (err){ throw err; }

    console.log(res.rows);
    client.end();
});

