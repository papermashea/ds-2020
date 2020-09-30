{"filter":false,"title":"fetch.js","tooltip":"/week01/data/fetch.js","undoManager":{"mark":14,"position":14,"stack":[[{"start":{"row":0,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["npm install request","mkdir data",""],"id":1}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":1},"action":"insert","lines":["/"],"id":3},{"start":{"row":0,"column":1},"end":{"row":0,"column":2},"action":"insert","lines":["/"]}],[{"start":{"row":1,"column":0},"end":{"row":1,"column":1},"action":"insert","lines":["/"],"id":4},{"start":{"row":1,"column":1},"end":{"row":1,"column":2},"action":"insert","lines":["/"]}],[{"start":{"row":2,"column":0},"end":{"row":3,"column":0},"action":"insert","lines":["",""],"id":5}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":2},"action":"remove","lines":["//"],"id":6}],[{"start":{"row":1,"column":0},"end":{"row":1,"column":2},"action":"remove","lines":["//"],"id":7}],[{"start":{"row":3,"column":0},"end":{"row":13,"column":3},"action":"insert","lines":["\"use strict\"","var request = require('request');","var fs = require('fs');","","request('https://parsons.nyc/thesis-2020/', function(error, response, body){","    if (!error && response.statusCode == 200) {","        fs.writeFileSync(`${__dirname}/data/thesis.txt`, body);","    }else{","        console.log(`GET request failed: ${response.statusCode} \"${response.statusMessage}\"`)","    }","});"],"id":8}],[{"start":{"row":3,"column":0},"end":{"row":3,"column":3},"action":"insert","lines":["// "],"id":12},{"start":{"row":4,"column":0},"end":{"row":4,"column":3},"action":"insert","lines":["// "]},{"start":{"row":5,"column":0},"end":{"row":5,"column":3},"action":"insert","lines":["// "]},{"start":{"row":7,"column":0},"end":{"row":7,"column":3},"action":"insert","lines":["// "]},{"start":{"row":8,"column":0},"end":{"row":8,"column":3},"action":"insert","lines":["// "]},{"start":{"row":9,"column":0},"end":{"row":9,"column":3},"action":"insert","lines":["// "]},{"start":{"row":10,"column":0},"end":{"row":10,"column":3},"action":"insert","lines":["// "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":3},"action":"insert","lines":["// "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":3},"action":"insert","lines":["// "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":3},"action":"insert","lines":["// "]}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":3},"action":"insert","lines":["// "],"id":13},{"start":{"row":1,"column":0},"end":{"row":1,"column":3},"action":"insert","lines":["// "]}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":3},"action":"remove","lines":["// "],"id":14},{"start":{"row":1,"column":0},"end":{"row":1,"column":3},"action":"remove","lines":["// "]}],[{"start":{"row":0,"column":0},"end":{"row":0,"column":3},"action":"insert","lines":["// "],"id":15},{"start":{"row":1,"column":0},"end":{"row":1,"column":3},"action":"insert","lines":["// "]}],[{"start":{"row":3,"column":0},"end":{"row":3,"column":3},"action":"remove","lines":["// "],"id":16},{"start":{"row":4,"column":0},"end":{"row":4,"column":3},"action":"remove","lines":["// "]},{"start":{"row":5,"column":0},"end":{"row":5,"column":3},"action":"remove","lines":["// "]},{"start":{"row":7,"column":0},"end":{"row":7,"column":3},"action":"remove","lines":["// "]},{"start":{"row":8,"column":0},"end":{"row":8,"column":3},"action":"remove","lines":["// "]},{"start":{"row":9,"column":0},"end":{"row":9,"column":3},"action":"remove","lines":["// "]},{"start":{"row":10,"column":0},"end":{"row":10,"column":3},"action":"remove","lines":["// "]},{"start":{"row":11,"column":0},"end":{"row":11,"column":3},"action":"remove","lines":["// "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":3},"action":"remove","lines":["// "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":3},"action":"remove","lines":["// "]}],[{"start":{"row":1,"column":13},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":17},{"start":{"row":2,"column":0},"end":{"row":2,"column":1},"action":"insert","lines":["/"]},{"start":{"row":2,"column":1},"end":{"row":2,"column":2},"action":"insert","lines":["/"]}],[{"start":{"row":2,"column":2},"end":{"row":2,"column":3},"action":"insert","lines":[" "],"id":18}],[{"start":{"row":2,"column":3},"end":{"row":2,"column":29},"action":"insert","lines":["/home/ec2-user/environment"],"id":19}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":14,"column":3},"end":{"row":14,"column":3},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1599600094296,"hash":"c6f3474f8d8ee5abd7d1a03aafce52f763068e93"}