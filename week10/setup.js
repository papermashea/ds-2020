////////////////////
//WEEK 10 STEP 1: SETUP
////////////////////
//npm install --save
//npm install pg --save
//npm install async --save
//npm install dotenv --save
//npm install aws-sdk

"use strict"

// MODULES REQUIRED
const {Client} = require('pg'),
      dotenv = require('dotenv');


// AWS RDS POSTGRESQL INSTANCE
dotenv.config(); 
var db_credentials = new Object();
db_credentials.user = 'shea';
db_credentials.host = 'data-structures.c5ol2211lbns.us-east-1.rds.amazonaws.com'; // ENDPOINT FROM RDW AWS CONSOLE
db_credentials.database = 'aa'; // DB instance identifier
db_credentials.password = process.env.AWSRDS_PW; //call to dovenv pw
db_credentials.port = '5432';

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

//////////
// CREATING DB
//////////

// POSTRGES METHOD
// Sample SQL statement to create a table: 
var thisQuery = "CREATE TABLE sensorData ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});






