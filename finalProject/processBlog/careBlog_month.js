// npm i node
// npm i pg
// npm i aws-sdk
// npm i async
// npm i papaparse
// npm i csvtojson

const AWS = require('aws-sdk'),
      async = require('async'),
      fs = require('fs');
      
// const list = fs.readFileSync('data/processblog_caresheet.csv', 'utf8'),
//       csv = papa.parse(list, {
//           header:true, 
//           // dynamicTyping:true,
//           }),
//     rows = csv.data;

// console.log(`Loaded ${rows.length} rows from csv:`)
// console.log(rows);

var careEntries = [];

class CareEntry {
  constructor(month, date, fed, watered, cleaned, shed, waste, handleTime, light, substrate, loc, notes) {
  // constructor(entry, dt, fed, watered, cleaned, substrate, shed, loc, notes) {
    this.month = {};
    this.month.S = month.toString();
    this.date = {};
    this.date.S = date;
    this.fed = {};
    this.fed.BOOL = fed;
    this.watered = {};
    this.watered.BOOL = watered;
    this.cleaned = {};
    this.cleaned.BOOL = cleaned;
    this.shed = {};
    this.shed.BOOL = shed;
    this.waste = {};          // N: WASTE IN MG
    this.waste.S = waste.toString();
    this.handleTime = {};
    this.handleTime.S = handleTime.toString(); // N: TIME IN MIN
    this.light = {};          // N: LIGHT IN WATTS
    this.light.S = light.toString(); 
    this.substrate = {};
    this.substrate.S = substrate;
    this.loc = {};
    this.loc.S = loc;
    this.notes = {};
    this.notes.S = notes;
  }
}

careEntries.push(new CareEntry('November',"Monday, November 30, 2020",false,true,false,false,0,0,5,'Aspen','Living room shelf','Low light'));
careEntries.push(new CareEntry('December',"Friday, December 4, 2020",false,true,false,false,0,0,5,'Aspen','Living room shelf','No notes recorded'));
careEntries.push(new CareEntry('December',"Thursday, December 10, 2020",false,true,false,false,0,0,0,'Aspen','Living room shelf','No notes recorded'));
careEntries.push(new CareEntry('July',"Friday, July 17, 2020",true,true,true,false,2,20,10,'Cypress','Parlor','No notes recorded'));
careEntries.push(new CareEntry('August',"Saturday, August 8, 2020",true,true,false,true,10,10,10,'Cypress','Parlor','Fed in bucket'));
careEntries.push(new CareEntry('September',"Wednesday, September 2, 2020",false,true,false,false,0,60,10,'Aspen','Parlor','Olivia handled'));
careEntries.push(new CareEntry('September',"Thursday, September 10, 2020",true,true,false,true,5,10,10,'Aspen','Parlor','Fed in bucket'));
careEntries.push(new CareEntry('September',"Sunday, September 20, 2020",false,true,false,true,0,20,10,'Aspen','Bedroom','Bailey handled'));
careEntries.push(new CareEntry('October',"Thursday, October 1, 2020",true,true,true,false,0,10,5,'Fresh Aspen','Bedroom','Rhianfalsen handled'));
careEntries.push(new CareEntry('October',"Friday, October 30, 2020",true,true,false,false,10,20,5,'Aspen','Bedroom','Did falset like direct morning sun'));
careEntries.push(new CareEntry('October',"Saturday, October 31, 2020",false,true,false,false,0,10,5,'Aspen','Living room','Angela handled'));
careEntries.push(new CareEntry('October',"Saturday, October 31, 2020",false,true,false,false,0,10,5,'Aspen','Living room','Angela handled'));
careEntries.push(new CareEntry('November',"Monday, November 2, 2020",false,true,true,false,0,10,5,'Fresh Aspen','Living room','Moved to near heating pole'));
careEntries.push(new CareEntry('November',"Friday, November 6, 2020",false,true,false,false,0,20,5,'Aspen','Living room','Out a lot'));
careEntries.push(new CareEntry('November',"Sunday, November 8, 2020",false,true,false,true,5,10,5,'Aspen','Living room','Moved away from heating pole'));
careEntries.push(new CareEntry('November',"Thursday, November 12, 2020",false,true,false,false,0,20,5,'Aspen','Living room','In skull!'));
careEntries.push(new CareEntry('November',"Saturday, November 14, 2020",false,true,true,false,2,10,5,'Fresh Aspen','Living room','Branch added'));
careEntries.push(new CareEntry('November',"Monday, November 16, 2020",false,true,false,false,0,0,5,'Aspen','Living room','No notes recorded'));

console.log(careEntries)

AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

let dynamodb = new AWS.DynamoDB();


async.eachSeries(careEntries, function(value, callback) {
    var params = {};
    params.Item = value;
    params.TableName = "care-blog-month";

  console.log(params)

    dynamodb.putItem(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });

    setTimeout(callback, 1000); // move on to the next entry
}, function() {
    console.log('Done!');
});
