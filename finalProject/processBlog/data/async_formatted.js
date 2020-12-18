// npm i node
// npm i pg
// npm i aws-sdk
// npm i async
// npm i papaparse
// npm i csvtojson

const AWS = require('aws-sdk'),
      async = require('async'),
      papa = require('papaparse'),
      fs = require('fs');
      
const list = fs.readFileSync('data/processblog_caresheet.csv', 'utf8'),
      csv = papa.parse(list, {
          header:true, 
          // dynamicTyping:true,
          }),
    rows = csv.data;

// console.log(`Loaded ${rows.length} rows from csv:`)
// console.log(rows);

async.each(rows, function(row, format, callback) {
  let date = Date.parse(row.date);
  row.date = Date.parse(row.date);
// console.log(row.date)
// console.log(date);
  
  let fed = rows.fed; 
    for (fed in row) {
      if (row.fed === "No") {
          row.fed = false;
      }else if (row.fed === "Yes") {
          row.fed = true;
      }else row.fed = row.fed;
    }
    
  let watered = rows.watered; 
    for (watered in row) {
      if (row.watered === "No") {
          row.watered = false;
      }else if (row.watered === "Yes") {
          row.watered = true;
      }else row.watered = row.watered;
    }

  let cleaned = rows.cleaned; 
    for (cleaned in row) {
      if (row.cleaned === "No") {
          row.cleaned = false;
      }else if (row.cleaned === "Yes") {
          row.cleaned = true;
      }else row.cleaned = row.cleaned;
    }

  let shed = rows.shed; 
    for (shed in row) {
      if (row.shed === "No") {
          row.shed = false;
      }else if (row.shed === "Yes") {
          row.shed = true;
      }else row.shed = row.shed;
    }
      
  let notes = rows.notes;
    for (notes in row) {
      if (row.notes === null) {
          row.notes = 'No notes recored';
        }else row.notes = row.notes;
    }

});

// class CareEntry {
//   constructor(entry, date, fed, watered, cleaned, substrate, shed, waste, light, loc, time, notes) {
//     this.entry = {};
//     this.entry = row.index;
//     this.date = {};
//     this.date.S = date.toString();
//     this.watered = {};
//     this.watered.BOOL = watered
//     this.cleaned = {};
//     this.cleaned.BOOL = cleaned;
//     this.substrate = {};
//     this.substrate.S = substrate;
//     this.shed = {};
//     this.shed.BOOL = shed;
//     this.waste = {};
//     this.waste.N = waste.toString();
//     this.light = {};
//     this.light.N = light.toString();
//     this.loc = {};
//     this.loc.S = rows.location;
//     this.time = {};
//     this.time.N = time.toString();
//     this.notes = {};
//     this.notes = notes.toString();
//   }
// }

// console.table(rows);

AWS.config = new AWS.Config();
AWS.config.region = "us-east-1c";
let dynamodb = new AWS.DynamoDB();

async.eachSeries(rows, function(row, callback){
// console.table(rows)
// console.table(row)
  
  let params = {
    Item: rows[0],
    TabeName: 'careblog'
  };
  
  console.log(params)
  
  // dynamodb.putItem(params, function (err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  
  //   setTimeout(callback, 1000); // move on to the next entry
  // }, function() {
  //     console.log('Done!');
  // });
});



  // params.Item = rows[0];
  // params.TableName = 'careblog';
