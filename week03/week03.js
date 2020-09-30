////////////////////
//WEEK 03 
////////////////////


////////////////////
// ZONE 03 CLEANUP FROM WEEK 02
////////////////////
npm install cheerio
const fs = require('fs'),
      cheerio = require('cheerio');

// LOAD aa/03.txt INTO A VARIABLE
let content = fs.readFileSync('data/aa/03.txt');

// PARSE VARIABLE 'CONTENT' INTO A CHEERIO OBJECT
let $ = cheerio.load(content);

// MAKE AN ARRAY OF GENERAL LOCATION DATA
let locations = [];

REMOVE EMPTY EXCESS HTML
$('.detailsBox').empty(); //removing details
$('h4').empty(); //removing locations
$('b').empty(); //removing meeting names
$('img').empty(); //removing images + wheelchair text
$('a').empty(); //removing meeting names
$('span').empty(); //removing random spans

// USE REGEX TO REPLACE TABS/NOBREAK SPACES/RETURNS, ANYTHING IN PARENTHESIS
// $('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').each(function(i, elem) {
//   locations.push( $(elem).text().replace(/(\t|\n|\r)/gm, "").replace(/\s*\(.*?\)\s*/g, '').trim());
//     // console.log(locations)   

// USE REGEX TO PULL JUST ADDRESS AND ZIP
let addresses = []
$(locations).each(function(i, elem) {
  addresses.push( $(elem).text().split(',').trim());
  console.log(addresses)
});

WRITE ADDRESSES TO NEW DOCUMENT
fs.writeFileSync('data/aa-clean/zone03-locations.txt', locations.join("\n"));
});


////////////////////
// ENV AND API 
////////////////////

//npm install request async dotenv
//74 meetings total

"use strict"

// DEPENDENCIES
const fs = require('fs'),
      cheerio = require('cheerio'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');

// // LOAD aa/03.txt INTO A VARIABLE
let content = fs.readFileSync('data/aa/03.txt');

// // PARSE VARIABLE 'CONTENT' INTO A CHEERIO OBJECT
let $ = cheerio.load(content);

// // SCRAPE GENERAL LOCATION DATA
let locations = [];

// REMOVE EMPTY EXCESS HTML
$('.detailsBox').empty(); //removing details
$('h4').empty(); //removing locations
$('b').empty(); //removing meeting names
$('img').empty(); //removing images + wheelchair text
$('a').empty(); //removing meeting names
$('span').empty(); //removing random spans

// USE REGEX TO REPLACE TABS/NOBREAK SPACES/RETURNS, ANYTHING IN PARENTHESIS
$('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').each(function(i, elem) {
  locations.push($(elem).text().replace(/(\t|\n|\r)/gm, "").replace(/\s*\(.*?\)\s*/g, '').trim());
    // console.log(locations)

// USE SPLIT TO PULL JUST ADDRESSES
let locData = locations.split(",");
let addresses = []
$(locations).split(",").pop().each(function(i, elem) { 
  addresses.push($(elem.text().trim()))
  console.log(addresses)
  });
  
});

// TAMU API KEY
dotenv.config();
const API_KEY = process.env.TAMU_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

// ADDRESSES
let meetingsData = [];
let addresses = ['7 East 10th Street, 2nd Floor, 10003','155 East 22nd Street, Basement,NY 10010','61 Fourth Avenue, 3rd Floor, 9th & 10th St 10003,'];
// console.log(addresses)

// eachSeries in the async module iterates over an array and operates on each item in the array in series
// async.eachSeries(locations, function(value, callback) { //LOCATIONS MADE ME RUN OUT OF CREDITS (I thought there would only be 74 calls!)
async.eachSeries(addresses, function(value, callback) {
    let query = {
        streetAddress: value,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };

    // construct a querystring from the `query` object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);

    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }

        let tamuGeo = JSON.parse(body);
        console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
        meetingsData.push(tamuGeo);
    });

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('data/addressTest.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
  });

  
// });
