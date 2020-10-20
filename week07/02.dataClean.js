////////////////////
// DATA CLEAN
////////////////////
//npm install cheerio --save
//npm install fs --save
//npm install change-case --save
//npm install [-g] esformatter
//npm install async --save

"use strict"
var request = require('request');
const fs = require('fs'),
      cheerio = require('cheerio'),
      esformatter = require('esformatter'),
      querystring = require('querystring'),
      async = require('async'),
      dotenv = require('dotenv');

// LOAD aa/04.txt INTO A VARIABLE
let content = fs.readFileSync('data/aa-html/04.html');

// LOOP THROUGH ALL PAGES
// for (d = 0, d <10, d++){
//   let data
// }


// PARSE VARIABLE 'CONTENT' INTO A CHEERIO OBJECT
let $ = cheerio.load(content
, { normalizeWhitespace: true,}
        );
        
////////////////////
// DATA OBJECTS
// NAME
// VENUE
// ADDRESS
// LAT
// LONG
// DAY
// TIME
// TYPE
// INTEREST
// ACCESS
// REMOTE
// NOTE
////////////////////

// MEETING OBJECT
let meeting = [];

// CREATE DATA ARRAYS
// // IMPORTANT SUBSTRINGS
let meetingDT = [];
let meetingNL = [];

// // SPECIFIC ARRAYS
let names = [];
let venues = [];
let addresses = [];
let days = [];
let times = [];
let types = [];
let access = [];
let notes = [];

// IMPORTANT SUBSTRINGS
// // REMOVE USELESS INFORMATION
$('span').empty(); //removing random spans
$('img').empty(); //removing images + wheelchair text
$('td[style*="border-bottom:1px solid #dedede; width:90px"]').empty(); //removing 'Get directions' table elements

// // PULL MEETING NAMES AND LOCATIONS
$('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').each(function(i, elem) {
  meetingNL.push( $(elem).text().replace(/(\n|\t|\r)/gm, "").replace(/\s*\(.*?\)\s*/g, '').trim().split('<br />')); // NEW ARRAY ITEM AT EVERY LINE BREAK
      // console.log(meetingNL)
});

// // PULL MEETING DAYS, TIMES AND TYPES
$('td[style*="border-bottom:1px solid #e3e3e3;width:350px;"]').each(function(i, elem) {
  meetingDT.push( $(elem).text().replace(/(\n|\t|\r)/gm, "").replace(/\s*\(.*?\)\s*/g, '').trim().split('<br />')); // NEW ARRAY ITEM AT EVERY LINE BREAK
      // console.log(meetingDT)
});


// SPECIFIC ARRAYS: USING SUBSTRINGS
// // NAMES
meetingNL.children('b').each(function(i, elem) {
  names.push( $(elem).text().replace(/(\n|\t|\r)/gm, "").replace(/\s*\(.*?\)\s*/g, '').trim());
      console.log(names)
});

// SPECIFIC ARRAYS: REPETATIVE SELECTOR VERSION
// // NAMES FROM Bs
// $('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').find('b').each(function(i, elem) {
//   names.push( $(elem).text().replace(/(\n|\t|\r)/gm, "").replace(/\s*\(.*?\)\s*/g, '').trim());
      // console.log(names)
// });

// // VENUE FROM H4s
$('h4[style="margin:0;padding:0;"]').each(function(i, elem) {
  venues.push( $(elem).text());
      // console.log(venues)
});

// // DETAILS FROM DIV
$('div[class="detailsBox"]').each(function(i, elem) {
  notes.push( $(elem).text().replace(/(\n|\t|\r)/gm, "").trim());
      // console.log(notes)
});

// // DAYS FROM TD + B 
$('td[style*="border-bottom:1px solid #e3e3e3;width:350px;"]').find('b:first-child').each(function(i, elem) {
  days.push( $(elem).text().replace(/(\n|\t|\r)/gm, "").replace('From', "").replace('ys', "y").trim()); // CLEANER DAYS
    // console.log(days)
});

  




// // PUSH TO ARRAYS TO MEETING OBJECT USING FOR EACH
// venues.forEach(function(venues){ 
//     meeting.push(
//         {
//         "venue": venues
//         })
//     })
    
// names.forEach(function(names){ 
//     meeting.push(
//         {
//         "names": names,
//         })
//     })
//     console.log(meeting)




// ADJUST TO TITLE CASE


// let test = fs.writeFileSync('data/aa-clean/tests/zone04-meetingTest1.json', JSON.stringify(meeting));
            // console.log(`Number of meeting objects: ${meeting.length}`)


