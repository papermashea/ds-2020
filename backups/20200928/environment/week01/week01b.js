// a.forEach(element => console.log('https://parsons.nyc/aa/m' + element + '.html'));

// LOOPING NUMBERS THROUGH URLS AND REQUESTS
"use strict"
var request = require('request');
var fs = require('fs');

let a = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
let urls = [];
a.forEach(function(a){
    urls.push('https://parsons.nyc/aa/m' + a + '.html');
    // console.log(urls);
    
urls.forEach(function(url){    
    request(url, function(error, response, body){
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(`${__dirname}/data/aa4/` + a + `.txt`, body);
        }else{
            console.log(`GET request failed: ${response.statusCode} "${response.statusMessage}"`)
        }
    })
});
}); 