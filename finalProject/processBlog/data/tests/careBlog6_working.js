// npm i node
// npm i pg
// npm i aws-sdk
// npm i async
// npm i papaparse
// npm i csvtojson

const fs = require('fs'),
    async = require('async'),
    AWS = require('aws-sdk'),
    papa = require('papaparse'),
    csvToJson = require("csvtojson");

"use strict"

////////////////////
//////////
// DEFINE DATA
//////////
////////////////////

//////////
// PARSE CSV
//////////

// READ CSV WITH FILESTREAM
// const file = fs.createReadStream('data/processblog_caresheet.csv');

// // TEST WITH TABLE HEADERS - CHANGE PP CONFIG
const file = fs.createReadStream('data/processblog_caresheet.csv');

// PARSE CSV WITH PAPAPARSE
let careEntries = []; 
let careData = [];

papa.parse(file, {
  header:true, 
	delimiter: ",",
  skipEmptyLines: false,
  dynamicTyping: true,
  step: function(result) {
    // console.log(result.data)

    let entries = result.data;
    // let entries = [{"CareEntry":result.data}];
    console.log(entries)

//     careData.push(entries);
//       // console.log(careData);
//       // console.log('********')
//       // console.log('Care data includes: ', careData.length, 'total entries')
      
//      // // FORMAT DATE
//     entries.date = Date.parse(entries.date);

//     // // REPLACE Y/N WITH BOOLEANS
//     if (entries.fed != 'No') {
//         entries.fed = true;
//       }else entries.fed = false;

//     if (entries.watered != 'No') {
//         entries.watered = true;
//       }else entries.watered = false;

//     if (entries.cleaned != 'No') {
//         entries.cleaned = true;
//       }else entries.cleaned = false;

//     if (entries.shed != 'No') {
//         entries.shed = true;
//       }else entries.shed = false;

//     // // REPLACE NULLS
//     if (entries.time != null) {
//         entries.time = entries.time;
//       }else careData.time = 'Not handled';

//     if (entries.notes != null) {
//         entries.notes = entries.notes;
//       }else entries.notes = 'No notes';      

//   },
//   complete: function(results, file) {
  
//   careData.forEach(function(entry) {
//   careEntries.push(careData);
//     console.log(careEntries)
//     console.log('********')
//     console.log('Care entries includes: ', careEntries.length, 'total entries')
//   }) 
   
  }
});


////////////////////
//////////
// PUSH TO DB
//////////
////////////////////

//////////
// CONNECT TO DB
//////////

// AWS.config = new AWS.Config();
// AWS.config.region = "us-east-1c";

// var dynamodb = new AWS.DynamoDB();

// var params = {};
// params.Item = careEntries[0]; 
// params.TableName = "careblog";

// dynamodb.putItem(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });




// async.eachSeries(careEntries, function (meeting, callback){
//   setTimeout(callback, 4000); //{ // SETTING TIMEOUT TO 4S
 
//   let params = {
//     Item: meeting,
//     TableName: 'careblog'
//     };

//   // console.log(params)

//   // ADD TO DB
//     dynamodb.putItem(params, function (err, data) { // PUTITEM ADDS EACH ITEM IN PARAMS TO DB
//     if (err) console.log(err, err.stack); // an error occurred
//     // else console.table('aaMeetings_NYC');   // PRINT TABLE NAME IF SUCCESSFUL 
//     else console.table(data);   // PRINT TABLE IN CONSOLE IF SUCCESSFUL
//       });
// });
