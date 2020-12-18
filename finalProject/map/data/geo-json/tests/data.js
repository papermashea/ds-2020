//npm i cheerio
// npm i fs
// npm i pg
// npm i querystring
// npm i request
// npm i async
// npm i dotenv

const {Client} = require('pg'),
    fs = require('fs'),
    cheerio = require('cheerio'),
    querystring = require('querystring'),
    request = require('request'),
    async = require('async'),
    dotenv = require('dotenv');

"use strict"

//////////
// LOAD DATA INTO A VARIABLE
//////////

let content = fs.readFileSync('data/html/05.html');

// PARSE VARIABLE 'CONTENT' INTO A CHEERIO OBJECT
let $ = cheerio.load(content);


//////////
// BEGIN SCRAPING RELEVANT DETAILS
//////////

// TITLES FROM TD1
let titles = [];

$('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').find('b').each(function(i, elem) {
      // CLEAN TITLES
      let dashClean = titles.includes("- ");
      if (dashClean === true) {
        let dashBreak = titles.indexOf('- ');
           titles = titles.substring(0, dashBreak);
      }
  titles.push( $(elem).text().trim());
    // console.log(titles)
});
// console.table(titles)

// VENUES FROM TD1
let venues = [];

$('h4[style*="margin:0;padding:0;"]').each(function(i, elem) {
  $('span').remove(); //removing random spans
  
  venues.push( $(elem).text()
  .replace(/\//g, '')
  .replace(/(\t|\n|\r)/gm, '')
  .replace(/\s*\(.*?\)\s*/g, '').trim());
    // console.log(venues)
});

// ADDRESSES FROM TD1 SELECTED FROM LOCATIONS
let locations =[];
let streetAddress = [];
let addresses =[];
let zipcodes = [];

$('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').each(function(i, elem) {
  $(elem).find('.detailsBox').remove(); //removing details
  $(elem).find('h4').remove(); //removing locations
  $(elem).find('b').remove(); //removing meeting names
  $(elem).find('span').remove(); //removing random spans
  $(elem).find('br').remove(); //removing breaks
  
  locations.push( $(elem).text()
  .replace(/(\t|\n|\r)/gm, "")
  .replace(/\s*\(.*?\)\s*/g, '')
  .trim());
    // console.log(locations)

  let str = $(elem).text().trim();
  let commaBreak = str.indexOf(',');
  let streets = str.substring(0, commaBreak);
  
      // CLEAN STREETS OF EM DASHES AND PARENTHESES
      let emClean = streets.includes("-");
      if (emClean === true) {
        let emBreak = streets.lastIndexOf('-');
           streets = streets.substring(0, emBreak);
      }

      let parClean = streets.includes("(");
      if (parClean === true) {
        let parBreak = streets.indexOf(' (');
           streets = streets.substring(0, parBreak);
      }
    streetAddress.push(streets)
    
  let zips = str.match(/\b\d{5}\b/g);
  
      if (zips === null) {
          zips = '';
        }else zips = zips;
    
      // console.log(zips)
    zipcodes.push(zips)

  let address = streets.concat(', ', + zips);

  addresses.push(address);  
  // console.table(address)

// TRIMMING
// console.table(locations)
// console.table(addresses)

});

// // DETAILS FROM TD1
// let details = [];

// $('div[class=detailsBox]').each(function(i, elem) {
//   details.push( $(elem).text().trim())
//     console.log(details);
// });


// MEETING TIME AND DATE FROM TD2
let days = [];
let startTimes = [];
let endTimes = [];
let type = [];

let dayTimes = [];

$('td[style*="border-bottom:1px solid #e3e3e3;width:350px"]').each(function(i, elem) {

  dayTimes.push( $(elem).text()
  .replace(/(\t|\n|\r)/gm, "")
  .replace(/\s*\(.*?\)\s*/g, '')
  .trim());
    // console.log(dayTimes)
    
  let infoStr = $(elem).text().trim();
    // console.log(infoStr)

  // MEETING DAYS    
  let meetingDay = infoStr.indexOf(' to');
  let dayFrom = infoStr.substring(0, meetingDay);
    // console.log(dayFrom);
  let dayTo =  dayFrom.lastIndexOf('From ');
  let day = dayFrom.substring(0, dayTo).trim()
    // console.log(day);
    
  days.push(day);
    // console.log(days)

  // MEETING START TIMES    
  let startTime = infoStr.indexOf(' to ');
  let timeFrom = infoStr.substring(0, startTime);
      // console.log(timeFrom);
  let time = timeFrom.split(' From  ').pop();
    // console.log(time)

  startTimes.push(time);
  // console.log(startTimes)
  
  // MEETING END TIMES    
  let end = infoStr.indexOf(' Meeting ');
    // console.log(end)
  let endTimeFrom = infoStr.substring(0, end);
      // console.log(endTimeFrom);
  let endTime = endTimeFrom.split(' to ' ).pop();
    // console.log(endTime)

  endTimes.push(endTime);
  // console.log(endTimes)
  
  // // MEETING TYPES
  // let findType = infoStr.split('Meeting Type');
  //   // console.log(findType)
  // let defineTypes = infoStr.substring(0, findType)
  // console.log(defineTypes)
  
  // TRIMMING
    // console.table(days)
    // console.table(startTimes)
    // console.table(endTimes)

  
});


////////////////////
//////////
// PARSE INTO JSON OBJECT
//////////
////////////////////

dotenv.config();
const API_KEY = process.env.API_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

let len = streetAddress.length;
let meetings = [];
let meetingGeos = [];
let meetingData = [];

for (var x = 0; x < len; x++) {
  let meeting = {
      "title": titles[x],
      "venues": venues[x],
      "address": streetAddress[x],
      "city" : "New York",
      "state" : "NY",
      "days" : days[x],
      "startTime": startTimes[x],
      "endTime": endTimes[x],
  };

    meetings.push(meeting);
    // console.log(meetings)
    // console.log(JSON.stringify(meetings));
};


//   // ADD LAT LONG
  async.eachSeries(meetings, function(meeting, callback) {
 
  
          let meetingObj = {
            "title": meeting.title,
            "venues": meeting.venues,
            "streetAddress": meeting.address,
            "city" : "New York",
            "state" : "NY",
            "days" : meeting.days,
            "startTime": meeting.startTime,
            "endTime": meeting.endTime,
            "apikey" : API_KEY,
            "format" : "json",
            "version" : "4.01",
          };
        meetingData.push(meetingObj);
        // console.log(meetingData);
        // console.log(meetingData.length);

        

//  // REQUESTS SPECIFIED TAMU DATA
    let apiRequest = API_URL + '?' + querystring.stringify(meetingObj);
  
    request(apiRequest, function(err, resp, body) {
            if (err){ throw err; }
    
        // BODY: PUSH NEW MEETING GEO OBJECT WITH LATITUDE AND LONGITUDE TO MEETING GEOS ARRAY 
            let tamu = JSON.parse(body);
  
            let tamuAddress = tamu.InputAddress.StreetAddress;
              let lat = tamu.OutputGeocodes[0].OutputGeocode.Latitude;
              let long = tamu.OutputGeocodes[0].OutputGeocode.Longitude;
              // console.log(tamu['FeatureMatchingResultType'], tamuAddress, lat, long, apiRequest);
          
            let meetingGeo = {
                    "title" : meetingObj.title,
                    "venues": meetingObj.venues,
                    "streetAddress" : tamuAddress,
                    // "zip": meetingObj.zip,
                    "city" : meetingObj.city,
                    "state" : meetingObj.state,
                    "lat" : lat,
                    "long" : long,
                    "days" : meetingObj.days,
                    "startTime": meetingObj.startTime,
                    "endTime": meetingObj.endTime,
                    "apikey" : meetingObj.apikey,
                    "format" : meetingObj.format,
                    "version" : meetingObj.version,
                    };
  
            meetingGeos.push(meetingGeo);
            // console.log(meetingGeo);
            // console.log(meetingGeos);
            // console.log(meetingGeos.length)
            });// CLOSES REQUEST

//   // }; // CLOSES FOR LOOP
    setTimeout(callback, 2000);
    
  }, //CLOSES ASYNC    
    function() {
        // console.log(meetingData);
        // console.log(meetingData.length);

        // console.log(meetingGeos)
        // console.log(meetingGeos.length)

    fs.writeFileSync('data/geo-json/05.json', JSON.stringify(meetingGeos));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingGeos.length}`);
  });


// Total meetings
// 22
// 29
// 74
// 53
// 28
// 63
// 53
// 26
// 4
// 22