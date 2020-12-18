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
  header:false, 
  skipEmptyLines: true,
  step: function(result) {
  // FOR EACH PUSHES CareEntry TO EACH KEY IN DATA
    careData.push(result.data);
    careData.forEach(function(entry) {
      // console.log(entry);
      careEntries.push(new CareEntry);
      console.log(careEntries)
      });
  },
  complete: function(results, file) {
  }
});

// const myCareEntryObject = new CareEntry(careData[date] careData[fed] watered, cleaned, substrate, shed, waste, light, loc, time, notes]])



// careData.forEach(function(error, entry) {
//   if (!error && entry.statusCode == 200) {
//     careEntries.push(new CareEntry(careData));
//     console.log('Care data includes: ', careEntries.length, 'total entries')
//     console.log('********')
//     console.log(careEntries)
//   }else {
//     console.log(`GET request failed: ${entry.statusCode} "${entry.statusMessage}"`)
//   }
// });


//SAVE JSON FILE
// fs.writeFileSync('data/json/careEntries.json', JSON.stringify(careData));


//////////
// CONSTRUCT OBJECT CLASS
//////////

class CareEntry {
  constructor(date, fed, watered, cleaned, substrate, shed, waste, light, loc, time, notes) {
    this.date = date;
    this.fed = fed;
    this.watered = watered;
    this.cleaned = cleaned;
    this.substrate = substrate;
    this.shed = shed;
    this.waste = waste;
    this.light = light;
    this.loc = loc;
    this.time = time;
    this.notes = notes;
      // if (notes != null) {
      //   this.notes = {};
      //   this.notes.SS = notes; 
      // }    
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