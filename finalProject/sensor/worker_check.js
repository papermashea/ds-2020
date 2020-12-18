//npm install --save
//npm install pg --save
//npm install async --save
//npm install dotenv --save
//npm install aws-sdk --save
//npm install request --save
//npm install pm2 -g
//pm2 init

"use strict"

// MODULES REQUIRED
const {Client} = require('pg'),
    request = require('request'),
    dotenv = require('dotenv'),
    async = require('async');
    
// PARTICLE PHOTON
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'temp';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;


// AWS RDS POSTGRESQL INSTANCE
dotenv.config(); 
var db_credentials = new Object();
db_credentials.user = 'ds2020';
db_credentials.host = process.env.AWSRDS_EP; // ENDPOINT FROM RDW AWS CONSOLE
db_credentials.database = 'finaldata'; // DB instance identifier
db_credentials.password = process.env.AWSRDS_PW; //call to dovenv pw
db_credentials.port = '5432';

// CONNECT TO AWS RDS POSTRGRES
const client = new Client(db_credentials);
client.connect();

// Sample SQL statements for checking your work: 
// var thisQuery = "SELECT * FROM sensorData;"; // print all values
var thisQuery = "SELECT COUNT (*) FROM sensorData;"; // print all values

// var fixQuery = "UPDATE sensorData SET sensorValue=sensorValue*-67"
// var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
// var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;"; // print the number of rows for each sensorValue

// var thisQuery = "SELECT * FROM sensorDataN;"; // print all values
// var secondQuery = "SELECT COUNT (*) FROM sensorDataN;"; // print the number of rows
// var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;"; // print the number of rows for each sensorValue


// client.query(fixQuery, (err, res) => {
//     if (err) {throw err}
//     else {
//     console.table(res.rows);
//     }
// });

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});

// client.query(secondQuery, (err, res) => {
//     if (err) {throw err}
//     else {
//     // console.table(res.rows);
//     }
// });

// client.query(thirdQuery, (err, res) => {
//     if (err) {throw err}
//     else {
//     // console.table(res.rows);
//     }
//     client.end();
// });
