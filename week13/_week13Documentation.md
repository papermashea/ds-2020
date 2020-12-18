# Week 13: Iterating on final projects

***
## Assignment 1: AA Meetings

### Site setup
https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65

https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65

https://docs.npmjs.com/creating-node-js-modules

https://www.postgresql.org/docs/9.5/datatype.html

https://itnext.io/storing-json-in-postgres-using-node-js-c8ff50337013

https://stackabuse.com/reading-and-writing-json-files-with-node-js/


## Assignment 2: Process Blog
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
https://nodejs.org/api/fs.html
https://www.npmjs.com/package/convert-csv-to-json
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
https://www.npmjs.com/package/csv-parser
https://www.npmjs.com/package/csv-to-array
https://github.com/typeiii/jquery-csv
https://www.npmjs.com/package/convert-csv-to-array
https://stackoverflow.com/questions/49752889/how-can-i-read-a-local-file-with-papa-parse

forEach pushing a new CareEntry for each key in careData
```
// PARSE CSV WITH PAPAPARSE
var careEntries = []; 
var careData = [];

papa.parse(file, {
  header:false, 
  skipEmptyLines: true,
  step: function(result) {
    careData.push(result.data);
      // console.log(careData);
      // console.log('********')
      // console.log('Care data includes: ', careData.length, 'total entries')
    careData.forEach(function(entry) {
      // console.log(entry);
      careEntries.push(new CareEntry);
      console.log(careEntries)
      });
  },
  complete: function(results, file) {
  }
});
```