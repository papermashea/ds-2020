////////////////////
//WEEK 10 STEP 1: SETUP
////////////////////
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
var request = require('request');
const { Client } = require('pg');
    //   dotenv = require('dotenv');

// PARTICLE PHOTON
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'temp';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;


// AWS RDS POSTGRESQL INSTANCE
// dotenv.config(); 
var db_credentials = new Object();
db_credentials.user = 'shea';
db_credentials.host = process.env.AWSRDS_EP; // AWS environment in dotenv
db_credentials.database = 'aa'; // DB instance identifier
db_credentials.password = process.env.AWSRDS_PW; // AWS password in dovenv
db_credentials.port = '5432';


var getAndWriteData = function() {
    
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        
        // Store sensor value(s) in a variable
        // TEMP SENSOR
        var tv = JSON.parse(body).result;
        
        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        // var thisQuery = "INSERT INTO sensorData VALUES (" + tv + ", DEFAULT);"; // ADD ADDITIONAL SENSOR VALUES HERE
        var thisQuery = "INSERT INTO sensorData VALUES (" + tv + ");"; // SANS TIMESTAMP

        console.log(thisQuery); // for debugging
        
        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// write a new row of sensor data every five minutes
setInterval(getAndWriteData, 60000);

// DEBUGGING - note will take ~1min
// export PHOTON_ID='1f0026000447393035313138'
// export PHOTON_TOKEN='7c0b0d747141105da3a9d3e021ab6ea39b852667'

// // PM2
// pm2 start ecosystem.config.js
// pm2 list
// pm2 stop 0
