// npm install request // node package manager update
// mkdir data // make new subdirectory called "data"
// /home/ec2-user/environment // my location
// URL to scrape: https://parsons.nyc/aa/m01.html

// ORIGINAL REQUEST
"use strict"
var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/thesis-2020/', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/data/thesis.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    }
});