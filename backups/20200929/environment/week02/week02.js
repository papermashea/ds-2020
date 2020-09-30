////////////////////
//WEEK 02 
////////////////////
// Student ID: N00697093 => #03
// https://cheerio.js.org/
// const cheerio = require('cheerio')
// const $ = cheerio.load('<h2 class="title">Hello world</h2>')

// $('h2.title').text('Hello there!')
// $('h2').addClass('welcome')

// $.html()
// //=> <h2 class="title welcome">Hello there!</h2>

////////////////////
//STARTER CODE
////////////////////
// npm install cheerio

// const fs = require('fs'),
//       cheerio = require('cheerio');

// // load the thesis text file into a variable, `content`
// // this is the file that we created in the starter code from last week
// let content = fs.readFileSync('data/thesis.txt');

// // parse `content` into a cheerio object
// let $ = cheerio.load(content);

// // print (to the console) names of thesis students
// $('h3').each(function(i, elem) {
//     console.log($(elem).text());
// });

// // collect the titles into an array of strings
// let thesisTitles = []; 
// $('.project .title').each(function(i, elem) {
//   thesisTitles.push( $(elem).text().trim() );
// });

// // write the project titles to a text file, one per line
// fs.writeFileSync('data/thesisTitles.txt', thesisTitles.join("\n"));

////////////////////
// ZONE 03 CLEANUP
////////////////////
//npm install cheerio
const fs = require('fs'),
      cheerio = require('cheerio');

// LOAD aa/03.txt INTO A VARIABLE
let content = fs.readFileSync('data/aa/03.txt');

// PARSE VARIABLE 'CONTENT' INTO A CHEERIO OBJECT
let $ = cheerio.load(content
// , { normalizeWhitespace: true,}
        );
        

// PULL LOCATIONS
// let locations = []; 
// $('h4').each(function(i, elem) {
//   locations.push( $(elem).text().trim() );
//     console.log(locations)
// });

// $('h4').addClass('location')

// PULL MEETING NAMES
// let mtgName = [];
// $('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').find('b').each(function(i, elem) {
//   mtgName.push( $(elem).text().trim());
//     // console.log(mtgName)
// });

// REMOVE SELECTOR ATTEMPT
// let locAdd = [];
// $('h4').remove('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').each(function(i, elem) {
//   locAdd.push( $(elem).text().trim());
//     // console.log(locAdd)
// });

// TRYING TO ADD A CLASS FOR ADDRESSES
// let addresses = []
// $('</b><br />').after('<div class="address').before.each(function(i, elem) {
//   addresses.push( $(elem).html().trim());
    // console.log(locAdd))

// PULL ADDRESSES
let locations = [];

$('.detailsBox').empty(); //removing details
$('h4').empty(); //removing locations
$('b').empty(); //removing meeting names
$('img').empty(); //removing images + wheelchair text
$('a').empty(); //removing meeting names
$('span').empty(); //removing random spans
// $('\n').replaceWith(""); //replacing random line breaks
// $('\n\t\t\t\t\t\t').replaceWith(""); //replacing random line breaks
// $("\n\t\t\t\t\t\t").remove(); //What IS this
// $('\n'+'\t').replaceWith(""); //
// $("\t").replaceWith(""); //
// $("\t").remove(); //


// $("h4","b","img","a","span",".detailsBox").empty(); // Why can't I combine .empty selectors?
// $('h4','b','img','a','span','.detailsBox').empty(); // Do quotes/apostrophes make a difference?


// REGEX TO REMOVE LINEBREAKS, TABS AND NOBREAK SPACES
$('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').each(function(i, elem) {
  locations.push( $(elem).text().replace(/(\n\t\t\t\t\t\t|\t|\n|\r)/gm, ""));
    // console.log(locations)   

// REMOVING ADDITIONAL DESCRIPTION TEXT AND WRAPPING ADDRESSES IN A CLASSES
let addresses = [];

$(locations).each(function(i, elem) {
  addresses.push( $(elem).text().replace(/ *\([^)]*\) */g, ""));
  console.log(addresses)
    
});

// WRITE ADDRESSES TO NEW DOCUMENT
// fs.writeFileSync('data/aa-clean/zone03-locations_clean.html', locations.join("\n"));



});