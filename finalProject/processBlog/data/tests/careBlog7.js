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
    // console.log(result)
    // console.log(result.data)

    let date = Object.create(result.data.date);
    let fed = result.data.fed;
    let watered = result.data.watered;

    result.data.forEach(dataObj);
    function dataObj (item, object) {
        let entry = {
            'date': date,
            'fed': fed,
            'watered': watered,
        }
        // careData.push(entry)    
        console.log(entry)
        }

// NEW OBJECT FROM RESULTS.DATA ARRAY OF OBJECTS - not working
    // let entry = new Object();
    // let dataProperties = Object.assign(entry, result.data);
    // // console.log(dataProperties)

    // result.data.forEach(dataObj);
    
    // function dataObj (item, object) {
    //     Object.create(dataProperties)
    //     careData.push()
    // }



// console.log(careData)
    
    // for (const [key, value] of Object.entries(result.data)) {
    //   console.log(`${key}: ${value}`);
    // }
  
    }
});
    

 
    
    
    // console.log(entries)
    
      // // FORMAT DATE
    // entries.date = Date.parse(entries.date);

    // // // REPLACE Y/N WITH BOOLEANS
    // if (entries.fed != 'No') {
    //     entries.fed = true;
    //   }else entries.fed = false;

    // if (entries.watered != 'No') {
    //     entries.watered = true;
    //   }else entries.watered = false;

    // if (entries.cleaned != 'No') {
    //     entries.cleaned = true;
    //   }else entries.cleaned = false;

    // if (entries.shed != 'No') {
    //     entries.shed = true;
    //   }else entries.shed = false;

    // // // REPLACE NULLS
    // if (entries.time != null) {
    //     entries.time = entries.time;
    //   }else careData.time = 'Not handled';

    // if (entries.notes != null) {
    //     entries.notes = entries.notes;
    //   }else entries.notes = 'No notes';      
    
    // entries.forEach(item => careData.push(item));
    
    // careData.push(entries);
    //   console.log(careData);
    // console.log(careData.length);
    //   console.log('********')
    //   console.log('Care data includes: ', careData.length, 'total entries')




    
    // let empArray = [{  
    //     id: '1',  
    //     name: 'kiran'  
    //   },  
    //  {  
    //     id: '2',  
    //     name: 'john'  
    //   },{  
    //     id: '3',  
    //     name: 'Frank'  
    //   },  
    // ];  
      
    // let jsonObject = {};  
    // empArray.forEach(item => obj[item.id] = item.name);  
    // let json = JSON.stringify(jsonObject);  
    // console.log(empArray);  
    // console.log(json);  


    // CONSTRUCTOR FUNCTION FOR ENTRIES
        // function CareEntry(date, fed, watered, cleaned, substrate, shed, waste, light, loc, time, notes) {
        //     this.date = entries.date;
        //     this.fed = entries.fed;
        //     this.watered = entries.watered;
        //     this.cleaned = {};
        //     this.substrate.S = substrate;
        //     this.shed.BOOL = shed;
        //     this.waste.N = waste.toString();
        //     this.light.N = light.toString();
        //     this.loc.S = loc;
        //     this.time.N = time.toString();
        //     this.notes = notes.toString();
        // }
        

        // var first = new CareEntry(entries.date[0], entries.fed[0], entries.watered[0])
        // console.log(CareEntry)

    // async.each(entries, function (entry, callback){
    //   setTimeout(callback, 4000); //{ // SETTING TIMEOUT TO 4S
    //     careEntries.push(new CareEntry)
    //     // console.log(careEntries)
    //     console.log(careEntries.length)
    // });

    // DEFINE CARE ENTRIES
    // var careEntries = {};
    // careEntries.Item = careData[0]
    
    // console.log(entries.date)

    // EACHSERIES TO PROCESS ARRAY IN DB IN ORDER ALL TOGETHER
    // async.eachSeries(careData, function (entry, callback){
    //   setTimeout(callback, 4000); //{ // SETTING TIMEOUT TO 4S
     
    //   let careEntries = {
    //     date: entries.date,
    //     substrate: entries.substrate,
    //     };
    
    // });
    //      console.log(careEntries)
      
//END STEP  },
  
    // var params = {};
    // params.Item = careData[0]; 
    // params.TableName = "entriesTable";
    
    // //EACHSERIES TO PROCESS ARRAY IN DB IN ORDER ALL TOGETHER
    // async.eachSeries(careData, function (entries, callback){
    //   setTimeout(callback, 4000); //{ // SETTING TIMEOUT TO 4S
     
    //   let params = {
    //     Item: entries,
    //     TableName: 'entriesTable'
    //     };
    
    //   console.log(params)
      
    // });

   
 // END COMPLETE });






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


