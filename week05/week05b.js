////////////////////
//WEEK 05 
////////////////////

// DEPENDENCIES
// npm install async // npm install --save async
// npm install aws-sdk
// npm install console.table --save

// "use strict"
const fs = require('fs'),
      async = require('async');

var aaMeetings = [];

class meeting {
  constructor(primaryKey, name, venue, day, time, type, interest, accessible, remote) {
    this.pk = {};
    this.pk.S = primaryKey.toString(); // .N INDICATES NUMERIC | .S INDICATES STRING
    this.name = {};
    this.name.S = name.toString();
    this.venue = {};
    this.venue.S = venue.toString();
    this.day = {};
    this.day.S = day.toString();
    this.time = {};
    this.time.S = time.toString();
    this.type = {};
    this.type.S = type.toString();
    this.interest = {};
    this.interest.S = interest.toString();
    this.accessible = {};
    this.accessible.BOOL = accessible;
    this.remote = {};
    this.remote.BOOL = remote;
    // if (remote != null) { // UNINCLUDE A BOOLEAN VALUE FROM THE ITEM
    //   this.remote = {};
    //   this.remote.SS = remote; 
    // }
  }
}

//DEFINE MEETINGS FOR ARRAY TO ADD TO DB
aaMeetings.push(new meeting(1, 'Twenty-Two Below',	'Gustavus Adolphus Church', 'Thursday', '12:15 - 13:15 PM', 'Open discussion', 'None', false, true)); // FIND A BETTER WAY TO COUNT UP
aaMeetings.push(new meeting(2, 'Alive Again',	'Seafarers & Intl House, 2nd floor conference rm', 'Saturday', '13:00:00 - 14:00 PM', 'Step meeting', 'Meditation', true, true));
aaMeetings.push(new meeting(3, 'Agnostics at Noon',	'Lesbian, Gay, Bi-Sexual & Transgender Community Center, 3rd Floor, Room #312', 'Thursday', '12:00:00 - 13:00 PM', 'Closed discussion', 'LGBT, Agnostic', false, false));
aaMeetings.push(new meeting(4, 'At Bills Place',	'Calvary Church Parish House', 'Wednesday', '18:30:00 - 19:30 PM', 'Closed discussion', '', false, false));


// console.log(aaMeetings);

//ACCESS DB
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

//PUSH ARRAY TO DB

// //EACH MEETING ONE AT A TIME
// var params = {};
// params.Item = aaMeetings[1]; 
// params.TableName = "aaMeetings_NYC";

// // ADD TO DB
// dynamodb.putItem(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

//EACHSERIES TO PROCESS ARRAY IN DB IN ORDER ALL TOGETHER
async.eachSeries(aaMeetings, function (meeting, callback){
  setTimeout(callback, 4000); //{ // SETTING TIMEOUT TO 4S
 
  let params = {
    Item: meeting,
    TableName: 'aaMeetings_NYC'
    };

  // console.log(params)

  // ADD TO DB
    dynamodb.putItem(params, function (err, data) { // PUTITEM ADDS EACH ITEM IN PARAMS TO DB
    if (err) console.log(err, err.stack); // an error occurred
    // else console.table('aaMeetings_NYC');   // PRINT TABLE NAME IF SUCCESSFUL 
    else console.table(data);   // PRINT TABLE IN CONSOLE IF SUCCESSFUL
      });
});
