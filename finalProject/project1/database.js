////////////////////
//////////
// CONNECT TO API
//////////
////////////////////

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
let meetingData = fs.readFileSync('data/json/01.json');

let meetings = JSON.parse(meetingData);
// console.log(meetings);

//////////
// MAKE DATABASE
//////////

// // AWS RDS POSTGRESQL INSTANCE
dotenv.config(); 
let db_credentials = {
    host: 'data-structures2020.c5ol2211lbns.us-east-1.rds.amazonaws.com', // ENDPOINT FROM RDW AWS CONSOLE
    database: 'finaldata',
    user: 'ds2020',
    password: process.env.AWSRDS_PW,
    port: 5432,
}

// CONNECT TO AWS RDS POSTGRES DB
const client = new Client(db_credentials);
client.connect();


// CREATE TABLE WITH LISTED COLUMNS:
let query = `CREATE TABLE aameetings (
  title varchar(200),
  location varchar(200),
  address varchar(2000),
  lat double precision,
  long double precision,
  day varchar(60),
  startTime timestamptz,
  endTime timestamptz,
);`;


client.query(query, (err, res) => {
    if (err){ throw err; }

    console.log(res);
    client.end();
});

// ASYNC MODULE LOOPS THROUGH DATA TO PUT INTO TABLE
async.eachSeries(meetingData, function(value, callback) {
    let client = new Client(db_credentials); // CONNECT TO DB
    client.connect();

    // VARIABLES BECOME VALUES IN AN ARRAY
    let query = {
      text: "INSERT INTO aameetings VALUES($1, $2, $3)",
      values: [value.title, value.location, value.address, value.latLong.lat, value.latLong.lng, value.day, value.starTime, value.endTime]
    };

    client.query(query, (err, res) => {
        if (err){ throw err; }

        console.log(res);
        client.end();
    });
    setTimeout(callback, 1000);
});


// // SQL STATEMENT TO PULL ENTIRE TABLE CONTENTS 
// let query2 = "SELECT * FROM aalocations;"; // * TRANSLATES TO "ALL"

// client.query2(query2, (err, res) => {
//     if (err){ throw err; }
//     else {
//     console.log(res.rows);
//     client.end();
//     })
  



