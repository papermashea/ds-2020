////////////////////
//WEEK 05
////////////////////

// DEPENDENCIES
// npm install async
// "use strict"
const fs = require('fs'),
      // cheerio = require('cheerio'),
      // querystring = require('querystring'),
      // request = require('request'),
      // dotenv = require('dotenv'),
      async = require('async');


// DYNAMO DB DATA
// npm install aws-sdk
var aaMeetings = [];

class meeting {
  constructor(primaryKey, name, venue, day, time, type, interest, accessible, remote) {
    this.aa = {};
    this.aa.N = primaryKey.toString(); // .N INDICATES NUMERIC
    // this.aa = {};
    // this.aa.N = primaryKey.toString(); // ATTEMPTED TO SOLVE FOR PARTITIONING ERROR
    this.name = {};
    this.name.S = name;
    this.venue = {};
    this.venue.S = venue;
    this.day = {};
    this.day.S = day;
    this.time = {};
    this.time.S = time;
    // this.date = {}; 
    // this.date.S = new Date(date).toDateString();
    this.type = {};
    this.type.S = type;
    this.interest = {};
    this.interest.S = interest;
    this.accessible = {};
    this.accessible.BOOL = accessible;
    this.remote = {};
    this.remote.BOOL = remote;
    if (remote != null) { // UNINCLUDE A BOOLEAN VALUE FROM THE ITEM
      this.remote = {};
      this.remote.SS = remote; 
    }
    // this.month = {}; // VARIABLE CREATE ON PREVIOUS VALUES
    // this.month.N = new Date(date).getMonth().toString()
  }
}

// aaMeetings.push(new meeting(0, 'Twenty-Two Below',	'Gustavus Adolphus Church', 'Thursday', '12:15 - 13:15 PM', 'Open discussion', 'None', false, [''])); // TEST DB ADD
aaMeetings.push(new meeting(01, 'Twenty-Two Below',	'Gustavus Adolphus Church', 'Thursday', '12:15 - 13:15 PM', 'Open discussion', 'None', false, true)); // FIND A BETTER WAY TO COUNT UP
aaMeetings.push(new meeting(02, 'Alive Again',	'Seafarers & Intl House, 2nd floor conference rm', 'Saturday', '13:00:00 - 14:00 PM', 'Step meeting', 'Meditation', true, null));
aaMeetings.push(new meeting(03, 'Agnostics at Noon',	'Lesbian, Gay, Bi-Sexual & Transgender Community Center, 3rd Floor, Room #312', 'Thursday', '12:00:00 - 13:00 PM', 'Closed discussion', 'LGBT, Agnostic', false, true));

console.log(aaMeetings);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();


// async function addMeetings (){
  var params = {};
  params.TableName = "aa-meetings";
  params.Item = [];

const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const start = async () => {
  await asyncForEach(aaMeetings, async (num) => {
    await waitFor(50);
    // console.log(params.Item);
  });
  // console.log('Done');
}

start();


//   aaMeetings.forEach(function(aaMeeting){
//     await params.Item.push()
//   })
// }
  
// console.log(params.Item)

dynamodb.putItem(params, function (err, data) { // PUTITEM ADDS ITEM TO DB
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});