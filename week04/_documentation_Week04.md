# Week 4: RDS & SQL

## Assignment Notes 
I've always wanted to learn about SQL and this assignment made it really straightforward. I'm very interested in learning more about SQL and played around a little bit with the sqliteonline demo sets. Additionally, I found a very helpful resource on AWS shortcuts: https://docs.aws.amazon.com/cloud9/latest/user-guide/keybindings-default-apple-osx.html#keybindings-default-apple-osx-tabs so that I can more quickly switch between tabs and panes in my Cloup9 environment.

### Normalizing data models
![Ideal breakdown of AA Meeting Data Structure](aaDataModel_normalized.png "AA Meeting Data Model")
*Ideal breakdown of AA Meeting Data Structure*

***

## Setup

### Viewing and cleaning JSON
This time around, I used **npm install esformatter** and ran the command **esformatter [file]** to better examine my json much more quickly.

### RegEx cleaning with match
Capitals, etc removal

	// MODULES REQUIRED
	const {Client} = require('pg'),
	      dotenv = require('dotenv'),
	      async = require('async');

***

## Databases

### Creating a table
When I first ran the starter code, I encountered an error:

	(node:7231) UnhandledPromiseRejectionWarning

This was bevause I wasn't updating my code to the correct Endpoint in my RDS console, which I then noted in my comments.

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
	let query = `CREATE TABLE aalocations (
	  address varchar(150),
	  lat double precision,
	  long double precision
	);`;

	DROP TABLE IS DANGEROUS BUT CHANGING COLUMN VALUES IS HARD
	let query = "DROP TABLE aalocations;";

	client.query(query, (err, res) => {
	    if (err){ throw err; }

	    console.log(res);
	    client.end();
	});


### Segmenting, Commenting and Duplicating
I also learned the hard way why Aaron recommended compiling the pages as 3 separate scripts - managing duplications in my code became tricky and I ended up having to comment identification throughout the page. I prefer to have the initial code in 1 script to see it all togeher, but would like to break out my work from each week into individual scripts for my final project.  

***

## Data in the DB

### Adding data to the array
I was able to successfully put the sample addresses into the array and was also able to swap out the data for some of my own in the array.

	// ADDRESSES LISTED IN AN OBJECT WITH LAT LON
	let addressesForDb = [
	  {address: '63 Fifth Ave, New York, NY', latLong: {lat: 40.7353041, lng: -73.99413539999999} },
	  {address: '16 E 16th St, New York, NY', latLong: {lat: 40.736765,  lng: -73.9919024} },
	  {address: '2 W 13th St, New York, NY',  latLong: {lat: 40.7353297, lng: -73.99447889999999} }
	];


	// ASYNC MODULE LOOPS THROUGH DATA TO PUT INTO TABLE
	async.eachSeries(addressesForDb, function(value, callback) {
	    let client = new Client(db_credentials); // CONNECT TO DB
	    client.connect();

	//     // VARIABLES BECOME VALUES IN AN ARRAY
	    let query = {
	      text: "INSERT INTO aalocations VALUES($1, $2, $3)",
	      values: [value.address, value.latLong.lat, value.latLong.lng]
	    };

	    client.query(query, (err, res) => {
	        if (err){ throw err; }

	        console.log(res);
	        client.end();
	    });
	    setTimeout(callback, 1000);
	});


	// SQL STATEMENT TO PULL ENTIRE TABLE CONTENTS 
	let query = "SELECT * FROM aalocations;"; // * TRANSLATES TO "ALL"

	client.query(query, (err, res) => {
	    if (err){ throw err; }

	    console.log(res.rows);
	    client.end();
	});

***

## Assignment Output

### aalocations object database
I was able to create the database "aalocations" with the sample addresses for practice, and can see them all via console.log in the final script.

	ec2-user:~/environment/week04 $ node week04.js
	[ { address: '63 Fifth Ave, New York, NY',
	    lat: 40.7353041,
	    long: -73.99413539999999 },
	  { address: '16 E 16th St, New York, NY',
	    lat: 40.736765,
	    long: -73.9919024 },
	  { address: '2 W 13th St, New York, NY',
	    lat: 40.7353297,
	    long: -73.99447889999999 },
	  { address: '63 Fifth Ave, New York, NY',
	    lat: 40.7353041,
	    long: -73.99413539999999 },
	  { address: '16 E 16th St, New York, NY',
	    lat: 40.736765,
	    long: -73.9919024 },
	  { address: '2 W 13th St, New York, NY',
	    lat: 40.7353297,
	    long: -73.99447889999999 } ]
	ec2-user:~/environment/week04 $ 


### Quesions
- Is there any way to see the DB in RDS?
- What are best practices for script file management?
- How do you set a hard cap on # of calls?
