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
const file = fs.createReadStream('data/processblog_caresheet_th.csv');

// PARSE CSV WITH PAPAPARSE
let careEntries = [];

papa.parse(file, {
  header:true, 
	delimiter: ",",
  skipEmptyLines: true,
  dynamicTyping: true,
  step: function(result) {

//DATA RETURNS AS AN ARRAY OF ROWS
    let careData = result.data;
      // console.log(careData)
    //   console.log('********')
    //   console.log('Care data includes: ', careData.length, 'total entries')
      
// // EACH RESULT A STRING IN CareEntry DATE FIELD
    careData.forEach(function(entry) {
      careEntries.push(new CareEntry);
//     careData.forEach(function(entry) {
//       // console.log(entry);
//       careEntries.push(new CareEntry);
      console.log(careEntries)
      });
  },
  complete: function(results, file) {
    // careEntries.push(new CareEntry(careData));
    //   console.log(careEntries);
    //   console.log('********')
    //   console.log('Care data includes: ', careEntries.length, 'total entries')      
  }
});

//SAVE JSON FILE
// fs.writeFileSync('data/json/careEntries.json', JSON.stringify(careData));


//////////
// CONSTRUCT OBJECT CLASS
//////////

class CareEntry {
  constructor(date, fed, watered, cleaned, substrate, shed, waste, light, loc, handleTime, notes) {
    this.date = {};
    this.date.S = date.toString();
    this.watered = {};
    // this.watered.BOOL = watered
    this.cleaned = {};
    // this.cleaned.BOOL = cleaned;
    this.substrate = {};
    this.substrate.S = substrate;
    this.shed = {};
    this.shed.BOOL = shed;
    this.waste = {};
    this.waste.N = waste.toString();
    this.light = {};
    this.light.N = light.toString();
    this.loc = {};
    this.loc.S = loc;
    this.handleTime = {};
    this.handleTime.N = handleTime.toString();
    this.notes = {};
    this.notes = notes.toString();
      if (notes != null) {
        this.notes = {};
        this.notes.SS = notes; 
      }    
  }
}



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