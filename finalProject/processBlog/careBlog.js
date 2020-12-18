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
  constructor(entryNum, date, fed, watered, cleaned, substrate, shed, waste, light, loc, handleTime, notes) {
  // constructor(entry, dt, fed, watered, cleaned, substrate, shed, loc, notes) {
    this.entry = {};
    this.entry.S = entryNum.toString();
    this.date = {};
    this.date.S = new Date(date).toDateString();
    this.watered = {};
    this.watered.BOOL = watered;
    this.cleaned = {};
    this.cleaned.BOOL = cleaned;
    this.substrate = {};
    this.substrate.S = substrate;
    this.shed = {};
    this.shed.BOOL = shed;
    this.waste = {};          // N: WASTE IN MG
    this.waste.S = waste.toString();
    this.light = {};          // N: LIGHT IN WATTS
    this.light.S = light.toString(); 
    this.loc = {};
    this.loc.S = loc;
    this.handleTime = {};
    this.handleTime.S = handleTime.toString(); // N: TIME IN MIN
    this.notes = {};
    this.notes.S = notes;
  }
}

careEntries.push(new CareEntry(15,'November 30 2020',false,true,false,'Aspen',false,0,5,'Living room shelf',0,'Low light'));
careEntries.push(new CareEntry(16,'December 4 2020',false,true,false,'Aspen',false,0,5,'Living room shelf',0,'No notes recorded'));
careEntries.push(new CareEntry(17,'December 10 2020',false,true,false,'Aspen',false,0,0,'Living room shelf',0,'No notes recorded'));
careEntries.push(new CareEntry(0,'July 17 2020',true,true,true,'Cypress',false,2,10,'Parlor',20,'No notes recorded'));
careEntries.push(new CareEntry(1,'August 08 2020',true,true,false,'Cypress',true,10,10,'Parlor',10,'Fed in bucket'));
careEntries.push(new CareEntry(2,'September 02 2020',false,true,false,'Aspen',false,0,10,'Parlor',60,'Olivia handled'));
careEntries.push(new CareEntry(3,'September 10 2020',true,true,false,'Aspen',true,5,10,'Parlor',10,'Fed in bucket'));
careEntries.push(new CareEntry(4,'September 20 2020',false,true,false,'Aspen',true,0,10,'Bedroom',20,'Bailey handled'));
careEntries.push(new CareEntry(5,'October 01 2020',true,true,true,'Fresh Aspen',false,0,5,'Bedroom',10,'Rhianon handled'));
careEntries.push(new CareEntry(6,'October 30 2020',true,true,false,'Aspen',false,10,5,'Bedroom',20,'Did not like direct morning sun'));
careEntries.push(new CareEntry(7,'October 31 2020',false,true,false,'Aspen',false,0,5,'Living room',10,'Angela handled'));
careEntries.push(new CareEntry(8,'October 31 2020',false,true,false,'Aspen',false,0,5,'Living room',10,'Angela handled'));
careEntries.push(new CareEntry(9,'November 02 2020',false,true,true,'Fresh Aspen',false,0,5,'Living room',10,'Moved to near heating pole'));
careEntries.push(new CareEntry(10,'November 06 2020',false,true,false,'Aspen',false,0,5,'Living room',20,'Out a lot'));
careEntries.push(new CareEntry(11,'November 08 2020',false,true,false,'Aspen',true,5,5,'Living room',10,'Moved away from heating pole'));
careEntries.push(new CareEntry(12,'November 12 2020',false,true,false,'Aspen',false,0,5,'Living room',20,'In skull!'));
careEntries.push(new CareEntry(13,'November 14 2020',false,true,true,'Fresh Aspen',false,2,5,'Living room',10,'Branch added'));
careEntries.push(new CareEntry(14,'November 16 2020',false,true,false,'Aspen',false,0,5,'Living room',0,'No notes recorded'));

console.log(careEntries)

AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

let dynamodb = new AWS.DynamoDB();


async.eachSeries(careEntries, function(value, callback) {
    var params = {};
    params.Item = value;
    params.TableName = "care-blog";

  console.log(params)

    dynamodb.putItem(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });

    setTimeout(callback, 1000); // move on to the next entry
}, function() {
    console.log('Done!');
});
