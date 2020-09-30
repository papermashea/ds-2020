// npm install request // node package manager update
// mkdir data // make new subdirectory called "data"
// /home/ec2-user/environment // my location
// URL to scrape: https://parsons.nyc/aa/m01.html



// ORIGINAL REQUEST

// "use strict"
// var request = require('request');
// var fs = require('fs');

// request('https://parsons.nyc/thesis-2020/', function(error, response, body){
//     if (!error && response.statusCode == 200) {
//         fs.writeFileSync(`${__dirname}/data/thesis.txt`, body);
//     }else{
//         console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
//     }
// });



// BRUTE FORCE REQUEST

    // 01
    // "use strict"
    // var request = require('request');
    // var fs = require('fs');
    
    // request('https://parsons.nyc/aa/m01.html', function(error, response, body){
    //     if (!error && response.statusCode == 200) {
    //         fs.writeFileSync(`${__dirname}/data/aa/01.txt`, body);
    //     }else{
    //         console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    //     }
    // });
    
    // // 02
    // "use strict"
    // var request = require('request');
    // var fs = require('fs');
    
    // request('https://parsons.nyc/aa/m02.html', function(error, response, body){
    //     if (!error && response.statusCode == 200) {
    //         fs.writeFileSync(`${__dirname}/data/aa/02.txt`, body);
    //     }else{
    //         console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    //     }
    // });    

    // // 03
    // "use strict"
    // var request = require('request');
    // var fs = require('fs');
    
    // request('https://parsons.nyc/aa/m03.html', function(error, response, body){
    //     if (!error && response.statusCode == 200) {
    //         fs.writeFileSync(`${__dirname}/data/aa/03.txt`, body);
    //     }else{
    //         console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    //     }
    // });    
    
    // // 04
    // "use strict"
    // var request = require('request');
    // var fs = require('fs');
    
    // request('https://parsons.nyc/aa/m04.html', function(error, response, body){
    //     if (!error && response.statusCode == 200) {
    //         fs.writeFileSync(`${__dirname}/data/aa/04.txt`, body);
    //     }else{
    //         console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    //     }
    // });  

    // // 05
    // "use strict"
    // var request = require('request');
    // var fs = require('fs');
    
    // request('https://parsons.nyc/aa/m05.html', function(error, response, body){
    //     if (!error && response.statusCode == 200) {
    //         fs.writeFileSync(`${__dirname}/data/aa/05.txt`, body);
    //     }else{
    //         console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    //     }
    // });  

    // // 06
    // "use strict"
    // var request = require('request');
    // var fs = require('fs');
    
    // request('https://parsons.nyc/aa/m06.html', function(error, response, body){
    //     if (!error && response.statusCode == 200) {
    //         fs.writeFileSync(`${__dirname}/data/aa/06.txt`, body);
    //     }else{
    //         console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    //     }
    // });
    
    // // 07
    // "use strict"
    // var request = require('request');
    // var fs = require('fs');
    
    // request('https://parsons.nyc/aa/m07.html', function(error, response, body){
    //     if (!error && response.statusCode == 200) {
    //         fs.writeFileSync(`${__dirname}/data/aa/07.txt`, body);
    //     }else{
    //         console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    //     }
    // });    

    // // 08
    // "use strict"
    // var request = require('request');
    // var fs = require('fs');
    
    // request('https://parsons.nyc/aa/m08.html', function(error, response, body){
    //     if (!error && response.statusCode == 200) {
    //         fs.writeFileSync(`${__dirname}/data/aa/08.txt`, body);
    //     }else{
    //         console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    //     }
    // });    
    
    // // 09
    // "use strict"
    // var request = require('request');
    // var fs = require('fs');
    
    // request('https://parsons.nyc/aa/m09.html', function(error, response, body){
    //     if (!error && response.statusCode == 200) {
    //         fs.writeFileSync(`${__dirname}/data/aa/09.txt`, body);
    //     }else{
    //         console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    //     }
    // });  

    // // 10
    // "use strict"
    // var request = require('request');
    // var fs = require('fs');
    
    // request('https://parsons.nyc/aa/m10.html', function(error, response, body){
    //     if (!error && response.statusCode == 200) {
    //         fs.writeFileSync(`${__dirname}/data/aa/10.txt`, body);
    //     }else{
    //         console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    //     }
    // });  



// LOOPING REQUEST

"use strict"
var request = require('request');
var fs = require('fs');

//LOOPING URL ARRARY
var urlsList = ['https://parsons.nyc/aa/m01.html','https://parsons.nyc/aa/m02.html','https://parsons.nyc/aa/m03.html','https://parsons.nyc/aa/m04.html','https://parsons.nyc/aa/m05.html'];
var allPages = urlsList.length;
for (var i = 0; i < allPages; i++) {
    console.log(urlsList[i]);
 
//LOOPING STRING NUMBERS
// var a = for (let a = 01; a < 10; a++) {
//         console.log('https://parsons.nyc/aa/m' + 1 '.html')};

request(urls, function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(`${__dirname}/data/aa2/00.txt`, body);
    }else{
        console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
    }
};