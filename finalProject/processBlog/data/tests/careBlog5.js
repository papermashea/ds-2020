// npm i node
// npm i pg
// npm i aws-sdk
// npm i async
// npm i papaparse

const fs = require('fs'),
    async = require('async'),
    AWS = require('aws-sdk'),
    papa = require('papaparse');

"use strict"

////////////////////
//////////
// // DEFINE DATA
//////////
////////////////////

//////////
// // PARSE CSV
//////////

// // READ CSV WITH FILESTREAM
// const file = fs.createReadStream('data/processblog_caresheet.csv');

// // TEST WITH TABLE HEADERS - CHANGE PP CONFIG
const file = fs.createReadStream('data/processblog_caresheet.csv');

// // PARSE CSV WITH PAPAPARSE

papa.parse(file, {
  header:true, 
	delimiter: ",",
  skipEmptyLines: false,
  dynamicTyping: true,
  step: function(result) {
    let careEntries = [];
    for (var i = 0; i < careEntries.length; i++){
        careEntries.push(result.data);
          }
    
    // // FORMAT DATE
    careEntries.date = Date.parse(careEntries.date);

    // // REPLACE Y/N WITH BOOLEANS
    if (careEntries.fed != 'No') {
        careEntries.fed = true;
      }else careEntries.fed = false;

    if (careEntries.watered != 'No') {
        careEntries.watered = true;
      }else careEntries.watered = false;

    if (careEntries.cleaned != 'No') {
        careEntries.cleaned = true;
      }else careEntries.cleaned = false;

    if (careEntries.shed != 'No') {
        careEntries.shed = true;
      }else careEntries.shed = false;

    // // REPLACE NULLS
    if (careEntries.time != null) {
        careEntries.time = careEntries.time;
      }else careEntries.time = 'Not handled';

    if (careEntries.notes != null) {
        careEntries.notes = careEntries.notes;
      }else careEntries.notes = 'No notes';

    console.log(careEntries);
    console.log('Total care entries: ', careEntries.length, 'total entries');


      // console.log('********');
      // console.log('Parsed JSON object careData includes:');
    //   console.log(careData)
      
    // // PUSH 'careData' OBJECTS TO 'careEntries'
      // careEntries.push(careData);
      // console.log('********');
      // console.log('Each careData object in careEntry includes: ', Object.keys(careEntries).length, 'fields:');
      // console.log(careEntries)      
    //   console.log(careEntries)      
    //   console.log(careEntries.length)      

    // console.log('********')
    // console.log('Care entries includes: ', careEntries.length, 'entries, including:')
    // console.log(careEntries)      


    // ////////////////////
    // //////////
    // // // PUSH TO DB
    // //////////
    // ////////////////////
    
    // //////////
    // // // CONNECT TO DB
    // //////////
    
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

  },
  
  complete: function(results, file) {

  // //SAVE JSON FILE
  // fs.writeFileSync('data/json/careEntries.json', JSON.stringify(careEntries));

  }
});


