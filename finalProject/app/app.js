//npm i express
//npm i handlebars
//npm i express-handlebars
//npm i leaflet
//npm i moment
//npm i moment-timezone
//npm i aws-sdk
//npm i pg
//npm i fs 
//npm i dotenv
//npm i plotly.js@1.47.4

var express = require('express'), 
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');
const moment = require('moment-timezone');
const handlebars = require('handlebars');
var fs = require('fs');
const dotenv = require('dotenv');


// MAP TEMPLATES

const aaSource = fs.readFileSync("templates/aa.txt").toString();
var aatemplate = handlebars.compile(aaSource, { strict: true });

const aaEve = fs.readFileSync("templates/eve.txt").toString();
var evetemplate = handlebars.compile(aaEve, { strict: true });

const aaMorn = fs.readFileSync("templates/morn.txt").toString();
var morntemplate = handlebars.compile(aaMorn, { strict: true });

const aaSun = fs.readFileSync("templates/sun.txt").toString();
var suntemplate = handlebars.compile(aaSun, { strict: true });

const aaMon = fs.readFileSync("templates/mon.txt").toString();
var montemplate = handlebars.compile(aaMon, { strict: true });

const aaTues = fs.readFileSync("templates/tues.txt").toString();
var tuestemplate = handlebars.compile(aaTues, { strict: true });

const aaWed = fs.readFileSync("templates/wed.txt").toString();
var wedtemplate = handlebars.compile(aaWed, { strict: true });

const aaThurs = fs.readFileSync("templates/thurs.txt").toString();
var thurstemplate = handlebars.compile(aaThurs, { strict: true });

const aaFri = fs.readFileSync("templates/fri.txt").toString();
var fritemplate = handlebars.compile(aaFri, { strict: true });

const aaSat = fs.readFileSync("templates/sat.txt").toString();
var sattemplate = handlebars.compile(aaSat, { strict: true });



// SENSOR TEMPLATES
const sensordata = fs.readFileSync("templates/sensor.txt").toString();
var sdtemplate = handlebars.compile(sensordata, { strict: true });

const highdata = fs.readFileSync("templates/high.txt").toString();
var hightemplate = handlebars.compile(highdata, { strict: true });



// BLOG TEMPLATES
const pbSource = fs.readFileSync("templates/pb.txt").toString();
var pbtemplate = handlebars.compile(pbSource, { strict: true });

const lastSource = fs.readFileSync("templates/pblast.txt").toString();
var pblasttemplate = handlebars.compile(lastSource, { strict: true });

const lastSource1 = fs.readFileSync("templates/pblast1.txt").toString();
var pblast1template = handlebars.compile(lastSource1, { strict: true });

const formData = fs.readFileSync("templates/form.txt").toString();
var formtemp = handlebars.compile(formData, { strict: true });



// AWS RDS credentials
dotenv.config();
var db_credentials = new Object();
db_credentials.user = process.env.AWSRDS_UN;
db_credentials.host = process.env.AWSRDS_HT; 
db_credentials.database = process.env.AWSRDS_DB;
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;



app.get('/', function(req, res) {
    res.send('<link rel="stylesheet" href="css/styles.css?v=1.0"><div class ="demo"><h2 id="main">Shea Molloy DS-2020 Demo</h3><ul class="main"><li><a href="/aa">All-Access AA</a></li><li><a href="/temperature">Snekscape Sensor Data</a></li><li><a href="/processblog">Snekscape Care Data</a></li></ul></div>');
}); 

// respond to requests for /aa
app.get('/aa', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    client.connect();

    var meetingQuery = // MEETING LOCATION QUERY
    `SELECT lat, long, json_agg(json_build_object('title', title, 'venue', venue, 'type', type, 'address', address, 'day', day, 'starttime', starttime, 'endtime', endtime)) as meetings
        FROM aameetingsNY
        WHERE lat> 40.7069
        GROUP BY lat, long;`;

    client.query(meetingQuery, (qerr, qres) => { 
        if (qerr)  { throw qerr }

        else {
            var aaData = aatemplate({
                meetings: qres.rows,
                aadata: JSON.stringify(qres.rows),
            });
            
            res.send(aaData)
            // console.log(qres.rows)

            client.end();
            // console.log('responded to initial aameeting data request');
        }
    });
});

app.get('/morn', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    client.connect();

    var morn = // MEETING LOCATION QUERY
    `SELECT lat, long, json_agg(json_build_object('title', title, 'venue', venue, 'type', type, 'address', address, 'day', day, 'starttime', starttime, 'endtime', endtime)) as meetings
        FROM aameetingsNY
        WHERE lat> 40.7069
        AND starttime LIKE '%AM%'
        GROUP BY lat, long;`;

    client.query(morn, (qerr, qres) => { 
        if (qerr)  { throw qerr }

        else {
            var aaMorn = morntemplate({
                meetings: qres.rows,
                aaMorn: JSON.stringify(qres.rows),
            });
            
            res.send(aaMorn)

            client.end();
            // console.log('responded to morning aameeting data request');
        }
    });
});

app.get('/eve', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    client.connect();

    var eve = // MEETING LOCATION QUERY
    `SELECT lat, long, json_agg(json_build_object('title', title, 'venue', venue, 'type', type, 'address', address, 'day', day, 'starttime', starttime, 'endtime', endtime)) as meetings
        FROM aameetingsNY
        WHERE lat> 40.7069
        AND starttime LIKE '%PM%'
        GROUP BY lat, long;`;

    client.query(eve, (qerr, qres) => { 
        if (qerr)  { throw qerr }

        else {
            var aaEve = evetemplate({
                meetings: qres.rows,
                aaEve: JSON.stringify(qres.rows),
            });
            
            res.send(aaEve)

            client.end();
            // console.log('responded to evening aameeting data request');
        }
    });
});

app.get('/sun', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    client.connect();

    var sunQ = // MEETING LOCATION QUERY
    `SELECT lat, long, json_agg(json_build_object('title', title, 'venue', venue, 'type', type, 'address', address, 'day', day, 'starttime', starttime, 'endtime', endtime)) as meetings
        FROM aameetingsNY
        WHERE lat> 40.7069
        AND day LIKE 'Sun%'
        GROUP BY lat, long;`;

    client.query(sunQ, (qerr, qres) => { 
        if (qerr)  { throw qerr }

        else {
            var aaSun = suntemplate({
                meetings: qres.rows,
                aaSun: JSON.stringify(qres.rows),
            });
            
            res.send(aaSun)

            client.end();
            // console.log('responded to sunday aameeting data request');
        }
    });
});

app.get('/mon', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    client.connect();

    var monQ = // MEETING LOCATION QUERY
    `SELECT lat, long, json_agg(json_build_object('title', title, 'venue', venue, 'type', type, 'address', address, 'day', day, 'starttime', starttime, 'endtime', endtime)) as meetings
        FROM aameetingsNY
        WHERE lat> 40.7069
        AND day LIKE 'Mon%'
        GROUP BY lat, long;`;

    client.query(monQ, (qerr, qres) => { 
        if (qerr)  { throw qerr }

        else {
            var aaMon = montemplate({
                meetings: qres.rows,
                aaMon: JSON.stringify(qres.rows),
            });
            
            res.send(aaMon)

            client.end();
            // console.log('responded to mon aameeting data request');
        }
    });
});

app.get('/tues', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    client.connect();

    var tuesQ = // MEETING LOCATION QUERY
    `SELECT lat, long, json_agg(json_build_object('title', title, 'venue', venue, 'type', type, 'address', address, 'day', day, 'starttime', starttime, 'endtime', endtime)) as meetings
        FROM aameetingsNY
        WHERE lat> 40.7069
        AND day LIKE 'Tues%'
        GROUP BY lat, long;`;

    client.query(tuesQ, (qerr, qres) => { 
        if (qerr)  { throw qerr }

        else {
            var aaTues = tuestemplate({
                meetings: qres.rows,
                aaTues: JSON.stringify(qres.rows),
            });
            
            res.send(aaTues)

            client.end();
            // console.log('responded to tues aameeting data request');
        }
    });
});

app.get('/wed', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    client.connect();

    var wedQ = // MEETING LOCATION QUERY
    `SELECT lat, long, json_agg(json_build_object('title', title, 'venue', venue, 'type', type, 'address', address, 'day', day, 'starttime', starttime, 'endtime', endtime)) as meetings
        FROM aameetingsNY
        WHERE lat> 40.7069
        AND day LIKE 'Wed%'
        GROUP BY lat, long;`;

    client.query(wedQ, (qerr, qres) => { 
        if (qerr)  { throw qerr }

        else {
            var aaWed = wedtemplate({
                meetings: qres.rows,
                aaWed: JSON.stringify(qres.rows),
            });
            
            res.send(aaWed)

            client.end();
            // console.log('responded to wed aameeting data request');
        }
    });
});

app.get('/thurs', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    client.connect();

    var thursQ = // MEETING LOCATION QUERY
    `SELECT lat, long, json_agg(json_build_object('title', title, 'venue', venue, 'type', type, 'address', address, 'day', day, 'starttime', starttime, 'endtime', endtime)) as meetings
        FROM aameetingsNY
        WHERE lat> 40.7069
        AND day LIKE 'Thurs%'
        GROUP BY lat, long;`;

    client.query(thursQ, (qerr, qres) => { 
        if (qerr)  { throw qerr }

        else {
            var aaThurs = thurstemplate({
                meetings: qres.rows,
                aaThurs: JSON.stringify(qres.rows),
            });
            
            res.send(aaThurs)

            client.end();
            // console.log('responded to thurs aameeting data request');
        }
    });
});

app.get('/fri', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    client.connect();

    var friQ = // MEETING LOCATION QUERY
    `SELECT lat, long, json_agg(json_build_object('title', title, 'venue', venue, 'type', type, 'address', address, 'day', day, 'starttime', starttime, 'endtime', endtime)) as meetings
        FROM aameetingsNY
        WHERE lat> 40.7069
        AND day LIKE 'Fri%'
        GROUP BY lat, long;`;

    client.query(friQ, (qerr, qres) => { 
        if (qerr)  { throw qerr }

        else {
            var aaFri = fritemplate({
                meetings: qres.rows,
                aaFri: JSON.stringify(qres.rows),
            });
            
            res.send(aaFri)

            client.end();
            // console.log('responded to fri aameeting data request');
        }
    });
});

app.get('/sat', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    client.connect();

    var satQ = // MEETING LOCATION QUERY
    `SELECT lat, long, json_agg(json_build_object('title', title, 'venue', venue, 'type', type, 'address', address, 'day', day, 'starttime', starttime, 'endtime', endtime)) as meetings
        FROM aameetingsNY
        WHERE lat> 40.7069
        AND day LIKE 'Sat%'
        GROUP BY lat, long;`;

    client.query(satQ, (qerr, qres) => { 
        if (qerr)  { throw qerr }

        else {
            var aaSat = sattemplate({
                meetings: qres.rows,
                aaSat: JSON.stringify(qres.rows),
            });
            
            res.send(aaSat)

            client.end();
            console.log('responded to sat aameeting data request');
        }
    });
});






app.get('/temperature', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query 
    var avg = `SELECT EXTRACT(HOUR FROM sensorTime) as sensorhour,
             AVG(sensorValue::int) as num_obs
             FROM sensorData
             GROUP BY sensorhour
             ORDER BY sensorhour;`;

    client.connect();
    client.query(avg, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            // console.log(qres.rows)
            res.end(sdtemplate({ sensordata: JSON.stringify(qres.rows)}));
            client.end();
            // console.log('1) responded to request for sensor graph');
        }
    });
}); 


app.get('/high', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query 
    var high = `SELECT EXTRACT(HOUR FROM sensorTime) as sensorhour,
             MIN(sensorValue::int) as low_num,
             MAX(sensorValue::int) as high_num
             FROM sensorData
             GROUP BY sensorhour
             ORDER BY sensorhour;`;

    client.connect();
    client.query(high, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            console.log(qres.rows)
            res.end(hightemplate({ highdata: JSON.stringify(qres.rows)}));
            client.end();
            console.log('responded to request for sensor graph');
        }
    });
}); 





app.get(['/processblog', '/current'], function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    var thisMonth = {
        TableName : "care-blog-month",
        KeyConditionExpression: '#mo = :month',
        ExpressionAttributeNames: { 
        "#mo" : "month"
        },
        ExpressionAttributeValues: { // the query values
            ":month": {S: "December"},
            }
    };
    
    dynamodb.query(thisMonth, function(err, thisData) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw (err);
        }
        else {
            // console.log(thisData.Items); // this function pulls data selected by query
            res.end(pbtemplate({ 
                pbdata: JSON.stringify(thisData.Items)
                }));
            // console.log('responded to request for process blog data');
        }
    });
});

app.get(['/last'], function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    var thisMonth = {
        TableName : "care-blog-month",
        KeyConditionExpression: '#mo = :month',
        ExpressionAttributeNames: { 
        "#mo" : "month"
        },
        ExpressionAttributeValues: { // the query values
            ":month": {S: "November"},
            }
    };
    
    dynamodb.query(thisMonth, function(err, thisData) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw (err);
        }
        else {
            // console.log(thisData.Items); // this function pulls data selected by query
            res.end(pblasttemplate({ 
                pbldata: JSON.stringify(thisData.Items)
                }));
            // console.log('responded to request for process blog data');
        }
    });
});

app.get(['/last1'], function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    var thisMonth = {
        TableName : "care-blog-month",
        KeyConditionExpression: '#mo = :month',
        ExpressionAttributeNames: { 
        "#mo" : "month"
        },
        ExpressionAttributeValues: { // the query values
            ":month": {S: "October"},
            }
    };
    
    dynamodb.query(thisMonth, function(err, thisData) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw (err);
        }
        else {
            // console.log(thisData.Items); // this function pulls data selected by query
            res.end(pblast1template({ 
                pbl1data: JSON.stringify(thisData.Items)
                }));
            // console.log('responded to request for process blog data');
        }
    });
});

app.get(['/form'], function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    // var form = { 
    //     TableName: "care-blog-month",
    //     Item: {
    //     }
    // }
    
    // dynamodb.putItem(form, function(err, formData) {
    //     if (err) {
    //         console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    //         throw (err);
        // }
        // else {
            // console.log(thisData.Items); // this function pulls data selected by query
            // res.end(formtemp({ 
            //     formdata: JSON.stringify()
            //     }));
            formtemp({ formdata: JSON.stringify()});
            
            // // console.log('responded to request for process blog data');
        // }
    // });
});





// serve static files in /public
app.use(express.static('public'));

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// listen on port 8080
var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Server listening...');
});
