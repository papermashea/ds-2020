////////////////////
//WEEK 04
////////////////////

// MODULES REQUIRED
const {Client} = require('pg'),
      dotenv = require('dotenv'),
      async = require('async');

// AWS RDS POSTGRESQL INSTANCE
dotenv.config(); 
let db_credentials = {
    host: 'data-structures.cip6jcccwdtt.us-east-2.rds.amazonaws.com', // ENDPOINT FROM RDW AWS CONSOLE
    database: 'aa',
    user: 'ds2020',
    password: process.env.AWSRDS_PW,
    port: 5432,
}

// CONNECT TO AWS RDS POSTGRES DB
const client = new Client(db_credentials);
client.connect();

// CREATE TABLE WITH LISTED COLUMNS:
// let query = `CREATE TABLE aalocations (
//   address varchar(150),
//   lat double precision,
//   long double precision
// );`;

// DROP TABLE IS DANGEROUS BUT CHANGING COLUMN VALUES IS HARD
// let query = "DROP TABLE aalocations;";

// client.query(query, (err, res) => {
//     if (err){ throw err; }

//     console.log(res);
//     client.end();
// });

// ADDRESSES LISTED IN AN OBJECT WITH LAT LON

// let addressesForDb = [
//   {address: '63 Fifth Ave, New York, NY', latLong: {lat: 40.7353041, lng: -73.99413539999999} },
//   {address: '16 E 16th St, New York, NY', latLong: {lat: 40.736765,  lng: -73.9919024} },
//   {address: '2 W 13th St, New York, NY',  latLong: {lat: 40.7353297, lng: -73.99447889999999} }
// ];


// ASYNC MODULE LOOPS THROUGH DATA TO PUT INTO TABLE

// async.eachSeries(addressesForDb, function(value, callback) {
//     let client = new Client(db_credentials); // CONNECT TO DB
//     client.connect();

//     // VARIABLES BECOME VALUES IN AN ARRAY
//     let query = {
//       text: "INSERT INTO aalocations VALUES($1, $2, $3)",
//       values: [value.address, value.latLong.lat, value.latLong.lng]
//     };

//     client.query(query, (err, res) => {
//         if (err){ throw err; }

//         console.log(res);
//         client.end();
//     });
//     setTimeout(callback, 1000);
// });


// SQL STATEMENT TO PULL ENTIRE TABLE CONTENTS 
let query = "SELECT * FROM aalocations;"; // * TRANSLATES TO "ALL"

client.query(query, (err, res) => {
    if (err){ throw err; }

    console.log(res.rows);
    client.end();
});