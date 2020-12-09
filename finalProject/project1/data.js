////////////////////
//////////
// SCRAPE DATA FROM WEBPAGES
//////////
////////////////////

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

// let o = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
// let urls = [];
// let content = [];
//   console.log(content)

// o.forEach(function(o){
//     urls.push('data/original/'+ o +'.html');
//     // console.log(urls);

// urls.forEach(function(url){    
//     request(url, function(error, response, body){
//             // content.push(fs.readFileSync(`${__dirname}/data/original/` + o + `.html`));
//     })
// });

let content = fs.readFileSync('data/html/01.html');

// PARSE VARIABLE 'CONTENT' INTO A CHEERIO OBJECT
let $ = cheerio.load(content);


//////////
// BEGIN SCRAPING RELEVANT DETAILS
//////////

// TITLES FROM TD1
let titles = [];

$('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').find('b').each(function(i, elem) {
  titles.push( $(elem).text().trim());
    // console.log(titles)
});

// VENUES FROM TD1
let venues = [];

$('h4[style*="margin:0;padding:0;"]').each(function(i, elem) {
  $('span').remove(); //removing random spans
  
  venues.push( $(elem).text()
  .replace(/(\t|\n|\r)/gm, "")
  .replace(/\s*\(.*?\)\s*/g, '').trim());
    // console.log(venues)
});

// ADDRESSES FROM TD1 SELECTED FROM LOCATIONS
let locations =[];
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
  .replace(/\s*\(.*?\)\s*/g, ''));
    // console.log(locations)

  let str = $(elem).text().trim();
  let commaBreak = str.indexOf(",");
  let streets = str.substring(0, commaBreak);
    // console.log(streets);
  
  let zips = str.match(/\b\d{5}\b/g);
    // console.log(zips)
  
  zipcodes.push(zips)

  let address = streets.concat(', ', + zips);
  // console.log(address)

  addresses.push(address);  
  // console.log(addresses)

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
  .replace(/\s*\(.*?\)\s*/g, ''));
    // console.log(dayTimes)
    
  let infoStr = $(elem).text().trim();
    // console.log(infoStr)

  // MEETING DAYS    
  let meetingDay = infoStr.indexOf(' to');
  let dayFrom = infoStr.substring(0, meetingDay);
    // console.log(dayFrom);
  let dayTo =  dayFrom.lastIndexOf('From ');
  let day = dayFrom.substring(0, dayTo)
    // console.log(day);
    
  days.push(day);
    // console.log(days)

  // MEETING START TIMES    
  let startTime = infoStr.indexOf(' to');
  let timeFrom = infoStr.substring(0, startTime);
      // console.log(timeFrom);
  let time = timeFrom.split('From').pop();
    // console.log(time)

  startTimes.push(time);
  // console.log(startTimes)
  
  // MEETING END TIMES    
  let end = infoStr.indexOf(' Meeting');
    // console.log(end)
  let endTimeFrom = infoStr.substring(0, end);
      // console.log(endTimeFrom);
  let endTime = endTimeFrom.split('to').pop();
    // console.log(endTime)

  endTimes.push(endTime);
  // console.log(endTimes)
  
  // // MEETING TYPES
  // let findType = infoStr.split('Meeting Type');
  //   // console.log(findType)
  // let defineTypes = infoStr.substring(0, findType)
  // console.log(defineTypes)
  
});


////////////////////
//////////
// PARSE INTO JSON OBJECT
//////////
////////////////////

dotenv.config();
const API_KEY = process.env.API_KEY;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

let len = locations.length;
let meetings = [];
let meetingData = [];

for (var x = 0; x < len; x++) {
  let meeting = {
      "title": titles[x],
      "location": locations[x],
      "city" : "New York",
      "state" : "NY",
      "days" : days[x],
      "start time": startTimes[x],
      "end time": endTimes[x],
      "apikey" : API_KEY,
      "format" : "json",
      "version" : "4.01",
  };

    meetings.push(meeting);
    // console.log(JSON.stringify(meetings));
};


// ADD LAT LONG
async.eachSeries(meetings, function(value, callback) {
  for (var x = 0; x < len; x++) {
      let meetingGeo = {
        "title": titles[x],
        "location": locations[x],
        "city" : "New York",
        "state" : "NY",
        "days" : days[x],
        "start time": startTimes[x],
        "end time": endTimes[x],
        "apikey" : API_KEY,
        "format" : "json",
        "version" : "4.01",
      };

    meetingData.push(meetingGeo);
    // console.log(JSON.stringify(meetingData)

    let apiRequest = API_URL + '?' + querystring.stringify(meetingGeo);

    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }

        let tamuGeo = JSON.parse(body);
        console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
        meetingData.push(tamuGeo);
    });

  };

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
 }, function() {
    fs.writeFileSync('data/geo-json/01.json', JSON.stringify(meetingData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetings.length}`);
});
  

//////////
// WRITE TO JSON FILE
//////////

// fs.writeFileSync('data/json/'+o+'.json', JSON.stringify(meetings));
// console.log(`Number of meetings in this zone: ${meetings.length}`);

// fs.writeFileSync('data/geo-json/01.json', JSON.stringify(meetings));
// console.log(`Number of meetings in this zone: ${meetings.length}`);




