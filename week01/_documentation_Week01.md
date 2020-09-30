# Process Documentation
While the AWS setup and the node workflows went pretty smoothly, the loop and referencing the URLs with a loop was throwing me for a...loop. Please see below for my attempts pre- and post-class.

## Pre-class attempts
### Brute force
I was able to get the files with a brute force method i.e. copy and pasting each get method for all 10 webpages. This code is commented out but is fairly standard to the sample code.

### Looping method
For my loops, I attempted two methods: making an array with all the URLS, and trying to splice a URL with a looping number

**URL Array**
I was able to print every URL, but I wasn't sure how to then use that array in the request function.

**Adding numbers**
I was able to break up part of the string, but unsure of what to loop into it.

## Post-class attempts
### Step 1: Looping URLs
My first step was looping numbers through the URL structure as recommended with the forEach method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
I was able to create an array of the numbers (01-10) and use forEach to generate an array of URLs with the numbers from my array. I think injecting into the string of the URL may not be best practice as per our conversations in class, howevever I was able to shorten the original array I had made (of every URL hard coded).

### Step 2: Looping within a request
Adding URLs to a loop before my request proved rticky at first, though it ended up being the exact same setup as my original forEach loop once I remembered to extract a single url from urls for my request instead of request my entire array as one object.

## Step 3: Looping document names
I ended up breaking apart my document title in order to inject the same array into the text file names again. I'm not sure if there is a tidier way to name the files, I was heistant to edit the file sync too much.

##Step 4: Be patient!
I had to learn several times that AWS takes a second to execute the request and dump the data into a folder, hence there being several iterations.

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