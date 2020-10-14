////////////////////
//WEEK 06
////////////////////


// npm install console.table --save
// npm install aws-sdk
// npm install pg
// npm install dotenv


////////////////////
// STARTER CODE
////////////////////

// SQL CREATE DATABASE STARTER CODE
// let query = 'CREATE TABLE aaTest1 (
//     mtgday varchar(25), 
//     mtgtime  varchar(25), 
//     mtghour int, 
//     mtgvenue varchar(75), 
//     mtgaddress varchar(75), 
//     mtgregion varchar(75), 
//     mtgtypes varchar(150)''
// );

// // REQUIREMENTS
// const { Client } = require('pg'), // PG FOR POSGRES DB
//       dotenv = require('dotenv'); // FOR CREDENTIALS
// dotenv.config();

// // AWS RDS POSTGRESQL INSTANCE
// var db_credentials = {
//     user: 'ds2020',
//     host: 'data-structures.cip6jcccwdtt.us-east-2.rds.amazonaws.com', //REFERENCED FROM WEEK04.JS
//     database: 'aa',
//     password: process.env.AWSRDS_PW,
//     port: 5432,
// }


// // CONNECT TO DATABASE
// const client = new Client(db_credentials);
// client.connect();

// // SQL STATEMENT TO SHOW MEETINGS WITH REMOTE OPTIONS: 
// var thisQuery = "SELECT day, time, interest, remote FROM aaMeetings_nyc02";

// // SQL STATEMENT TO SHOW MEETINGS WITH REMOTE OPTIONS: 
// // var thisQuery = "SELECT day, time, interest, remote FROM aaMeetings_nyc02 WHERE remote = true;";

// client.query(thisQuery, (err, res) => {
//     if (err) {
//         console.log('unable to query"');}
//     else {
//         // CONSOLE.TABLE TO SHOWCASE ARRAY STRUCTURE
//         console.table(res.rows);
//         client.end();
//     }
// });

////////////////////
// STARTER CODE * WEEK04
////////////////////
// const {Client} = require('pg'),
//       dotenv = require('dotenv'),
//       async = require('async');

// // AWS RDS POSTGRESQL INSTANCE
// dotenv.config(); 
// let db_credentials = {
//     host: 'data-structures.cip6jcccwdtt.us-east-2.rds.amazonaws.com', // ENDPOINT FROM RDW AWS CONSOLE
//     database: 'aa',
//     user: 'ds2020',
//     password: process.env.AWSRDS_PW,
//     port: 5432,
// }

// // CONNECT TO AWS RDS POSTGRES DB
// const client = new Client(db_credentials);
// client.connect();

// // CREATE TABLE WITH LISTED COLUMNS:
// let query = `CREATE TABLE aaInterests (
//   address varchar(150),
//   lat double precision,
//   long double precision,
//   day varchar(150),
//   interest varchar(200),
//   remote varchar(200)
// );`;

// // client.query(query, (err, res) => {
//     if (err){ 
//         console.log ('error', err.message, err.stack) }
//     else {
//     console.log(res);
//     client.end();
//     }
// });

// // ADDRESSES LISTED IN AN OBJECT WITH LAT LON
// let addressesForDb = [
//   {address: '63 Fifth Ave, New York, NY', latLong: {lat: 40.7353041, lng: -73.99413539999999}, day:'Thursday', interest:'LGBT', remote:'Yes' },
//   {address: '16 E 16th St, New York, NY', latLong: {lat: 40.736765,  lng: -73.9919024}, day:'Friday', interest:'Agnostic', remote:'No' },
//   {address: '2 W 13th St, New York, NY',  latLong: {lat: 40.7353297, lng: -73.99447889999999}, day:'Thursday', interest:'Youth', remote:'Yes' }
// ];


// // ASYNC MODULE LOOPS THROUGH DATA TO PUT INTO TABLE
// async.eachSeries(addressesForDb, function(value, callback) {
//     let client = new Client(db_credentials); // CONNECT TO DB
//     client.connect();

//     // VARIABLES BECOME VALUES IN AN ARRAY
//     let query = {
//       text: "INSERT INTO aalocations VALUES($1, $2, $3)",
//       values: [value.address, value.latLong.lat, value.latLong.lng]
//     };

//     client.query(query, (err, res) => {
//         if (err) 
//             console.log ('error', err.message, err.stack);
//             else 
//         console.log(res);
//         client.end();
//     });
//     setTimeout(callback, 1000);
// });


// // SQL STATEMENT TO PULL ENTIRE TABLE CONTENTS 
// let select = "SELECT * FROM aalocations;"; // * TRANSLATES TO "ALL"

// client.select(select, (err, res) => {
//          if (err) 
//             console.log ('error', err.message, err.stack); 
//             else 
//         console.log(res);
//         client.end();
//     setTimeout (callback, 1000);
//     })
// });




////////////////////
// ASSIGNMENT
////////////////////

// REBUILD DB WITH PARTITION

// DEPENDENCIES
// npm install async // npm install --save async
// npm install aws-sdk
// npm install console.table --save

// "use strict"
const {Client} = require('pg'),
      fs = require('fs'),
      dotenv = require('dotenv'),
      async = require('async');

var aaMeetings = [];

class meeting {
  constructor(primaryKey, name, venue, day, time, sortKey, interest, accessible, remote) {
    this.meetingID = {};
    this.meetingID.N = primaryKey.toString(); // .N INDICATES NUMERIC | .S INDICATES STRING
    this.name = {};
    this.name.S = name.toString();
    this.venue = {};
    this.venue.S = venue.toString();
    this.day = {};
    this.day.S = day.toString();
    this.time = {};
    this.time.S = time.toString();
    this.type = {};
    this.type.S = sortKey.toString();
    this.interest = {};
    this.interest.S = interest.toString();
    this.accessible = {};
    this.accessible.BOOL = accessible;
    this.remote = {};
    this.remote.BOOL = remote;
    // if (remote != null) { // UNINCLUDE A BOOLEAN VALUE FROM THE ITEM
    //   this.remote = {};
    //   this.remote.SS = remote; 
    // }
  }
}

//DEFINE MEETINGS FOR ARRAY TO ADD TO DB
aaMeetings.push(new meeting(1,'Twenty-Two Below',	'Gustavus Adolphus Church', 'Thursday', '12:15 - 13:15 PM', 'Open discussion', '', false, true)); // FIND A BETTER WAY TO COUNT UP
aaMeetings.push(new meeting(2, 'Alive Again',	'Seafarers & Intl House, 2nd floor conference rm', 'Saturday', '13:00:00 - 14:00 PM', 'Step meeting', 'Meditation', true, true));
aaMeetings.push(new meeting(3, 'Agnostics at Noon',	'Lesbian, Gay, Bi-Sexual & Transgender Community Center, 3rd Floor, Room #312', 'Thursday', '12:00:00 - 13:00 PM', 'Closed discussion', 'LGBT, Agnostic', false, false));
aaMeetings.push(new meeting(4, 'At Bills Place',	'Calvary Church Parish House', 'Wednesday', '18:30:00 - 19:30 PM', 'Closed discussion', '', false, false));


// console.log(aaMeetings);

//ACCESS DB
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

//EACHSERIES TO PROCESS ARRAY IN DB IN ORDER ALL TOGETHER
async.eachSeries(aaMeetings, function (meeting, callback){
  // setTimeout(callback, 2000); //{ // SETTING TIMEOUT TO 2S
 
  let params = {
    Item: meeting,
    TableName: 'aaMeetings_nyc02'
    };

  // console.log(params)

  // ADD TO DB
    dynamodb.putItem(params, function (err, data) { // PUTITEM ADDS EACH ITEM IN PARAMS TO DB
    if (err) console.log(err, err.stack); // an error occurred
    // else console.table('aaMeetings_nyc02');   // PRINT TABLE NAME IF SUCCESSFUL 
    // else console.table(data);   // PRINT TABLE IN CONSOLE IF SUCCESSFUL
      });
});




/////////
// QUERYING NEW DB
////////


// AWS RDS POSTGRESQL INSTANCE FROM WEEK04
var db_credentials = {
    user: 'ds2020',
    host: 'data-structures.cip6jcccwdtt.us-east-2.rds.amazonaws.com', // ENDPOINT FROM RDW AWS CONSOLE
    database: 'aa',
    password: process.env.AWSRDS_PW,
    port: 5432,
}

// CONNECT TO AWS RDS POSTGRESQL
const client = new Client(db_credentials);
client.connect();


//CONNECT TO AWS
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "aaMeetings_nyc02",
    KeyConditionExpression: "#gp = :day", // the query expression
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#gp" : "group"
    },
    ExpressionAttributeValues: { // the query values
        ":day": {S: "Thursday"},
    }
};

dynamodb.query(params, function(err, data, callback) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    setTimeout(2000);
    }
});