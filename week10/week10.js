////////////////////
//WEEK 10
////////////////////
//npm install --save
//npm install pg --save
//npm install async --save
//npm install dotenv --save
//npm install aws-sdk
// npm install pm2 -g
// pm2 init

"use strict"

// MODULES REQUIRED
const {Client} = require('pg'),
      dotenv = require('dotenv');
    //   async = require('async');


// PARTICLE PHOTON
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'analogvalue';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;


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

// //DYNAMODB METHOD
// var AWS = require('aws-sdk');
// AWS.config = new AWS.Config();
// AWS.config.region = "us-east-1";

// var dynamodb = new AWS.DynamoDB();

// var params = {};
// params.Item = sensor[0]; 
// params.TableName = "sensorData";

// dynamodb.putItem(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

var getAndWriteData = function() {
    
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        
        // Store sensor value(s) in a variable
        var sv = JSON.parse(body).result;
        
        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO sensorData VALUES (" + sv + ", DEFAULT);";
        console.log(thisQuery); // for debugging
        
        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// write a new row of sensor data every five minutes
setInterval(getAndWriteData, 300000);





