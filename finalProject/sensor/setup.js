// npm install
// npm install pg 
// npm install async
// npm install dotenv 
// npm install aws-sdk
// npm install pm2 -g
// pm2 init
// npm i dynamodb

"use strict"

// MODULES REQUIRED
const {Client} = require('pg'),
    request = require('request'),
    dotenv = require('dotenv'),
    async = require('async');


// PARTICLE PHOTON
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'analogvalue';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;


// AWS RDS POSTGRESQL INSTANCE
dotenv.config(); 
var db_credentials = new Object();
db_credentials.user = 'ds2020';
db_credentials.host = process.env.AWSRDS_EP; // ENDPOINT FROM RDW AWS CONSOLE
db_credentials.database = 'finaldata'; // DB instance identifier
db_credentials.password = process.env.AWSRDS_PW; //call to dovenv pw
db_credentials.port = '5432';

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

//////////
// CREATING DB
//////////

// POSTRGES METHOD
// var thisQuery = "CREATE TABLE sensorDataN ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";
// var thisQuery = "CREATE TABLE sensorData ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";

// var thisQuery = "DROP TABLE sensorDataN";
var thisQuery = "SELECT * from sensorDataN";

// var thisQuery = "CREATE TABLE sensorChart ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";

// var thisQuery = "SELECT * from sensorData";
// var thisQuery = "SELECT sensorValue from sensorData";
// var thisQuery = "DROP TABLE sensorData"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
