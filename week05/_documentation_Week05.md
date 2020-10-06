# Week 5: DynamoDB

## Assignment Notes 
Aaron's videos seem to be slightly out of date, based on e2c interface options (i.e. modify iam role vs. attach iam role). This was easy to work around, the more difficult part of the assignment was exploring asyc/await in a forEach loop. I'm working with this write-up:https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404?gi=b27bcf2d6bb7

***

## Setup

### Dynamo Creation
I had a difficult time understanding partitioning, but eventually played around enough with defaults and other resources to get the starter code to work. I'm still having errors asking for my partitioning keys, even after switching between 3-4 databases with varying 'aa' or 'pk' keys. 
![partitioning databases, first shot.](/images/pk.png "Misunderstanding partitioning, jumped ahead.")

### Roles from the starter code
Role creation from sample code
![alt text for screen readers](/images/pk.png "Text to show on mouseover")

### JS Classes
Role creation from sample code
![alt text for screen readers](/images/modifyRole.png "Text to show on mouseover")

### Permissions
I vaguely understand the Dynamo roles.

***

## Starter code 

### Error from adding item
    { ValidationException: One or more parameter values were invalid: Missing the key pk in the item
    at Request.extractError (/home/ec2-user/node_modules/aws-sdk/lib/protocol/json.js:52:27)
    at Request.callListeners (/home/ec2-user/node_modules/aws-sdk/lib/sequential_executor.js:106:20)
    at Request.emit (/home/ec2-user/node_modules/aws-sdk/lib/sequential_executor.js:78:10)
    at Request.emit (/home/ec2-user/node_modules/aws-sdk/lib/request.js:688:14)
    at Request.transition (/home/ec2-user/node_modules/aws-sdk/lib/request.js:22:10)
    at AcceptorStateMachine.runTo (/home/ec2-user/node_modules/aws-sdk/lib/state_machine.js:14:12)
    at /home/ec2-user/node_modules/aws-sdk/lib/state_machine.js:26:10
    at Request.<anonymous> (/home/ec2-user/node_modules/aws-sdk/lib/request.js:38:9)
    at Request.<anonymous> (/home/ec2-user/node_modules/aws-sdk/lib/request.js:690:12)
    at Request.callListeners (/home/ec2-user/node_modules/aws-sdk/lib/sequential_executor.js:116:18)
  message:
   'One or more parameter values were invalid: Missing the key pk in the item',

### Defaults in new tables
Tried making a new table to get around the error re: partitioning, didn't work.

### Success in DB population
Was able to successfully add to the starter db
![alt text for screen readers](/images/dbPop.png "Text to show on mouseover")

### Adding a loop
async forEach

***
## Assignment Output

### Looping and decision making
An error when re-introducing async
    Octal literals are not allowed in strict mode.

Error with pushing params.Item array to db
     { UnexpectedParameter: Unexpected key 'remote' found in params.Item['2']
     
Digging into this led to more errors with my params.Item array
    var params = {};
    params.Item = [];
    params.TableName = "aa-meetings";

aaMeetings.forEach(function(aaMeetings){
  params.Item.push(aaMeetings)
})


Issues with params validation
    'There were 27 validation errors:\n* UnexpectedParameter: Unexpected key \'aa\' found in params.Item[\'0\']\n* UnexpectedParameter: Unexpected key \'name\' found in params.Item[\'0\']\n* UnexpectedParameter: Unexpected key \'venue\' found in params.Item[\'0\']\n* UnexpectedParameter: Unexpected key \'day\' found in params.Item[\'0\']\n* UnexpectedParameter: Unexpected key \'time\' found in params.Item[\'0\']\n* UnexpectedParameter: Unexpected key \'type\' found in params.Item[\'0\']\n* UnexpectedParameter: Unexpected key \'interest\' found in params.Item[\'0\']\n* UnexpectedParameter: Unexpected key \'accessible\' found in params.Item[\'0\']\n* UnexpectedParameter: Unexpected key \'remote\' found in params.Item[\'0\']\n* UnexpectedParameter: Unexpected key \'aa\' found in params.Item[\'1\']\n* UnexpectedParameter: Unexpected key \'name\' found in params.Item[\'1\']\n* UnexpectedParameter: Unexpected key \'venue\' found in params.Item[\'1\']\n* UnexpectedParameter: Unexpected key \'day\' found in params.Item[\'1\']\n* UnexpectedParameter: Unexpected key \'time\' found in params.Item[\'1\']\n* UnexpectedParameter: Unexpected key \'type\' found in params.Item[\'1\']\n* UnexpectedParameter: Unexpected key \'interest\' found in params.Item[\'1\']\n* UnexpectedParameter: Unexpected key \'accessible\' found in params.Item[\'1\']\n* UnexpectedParameter: Unexpected key \'remote\' found in params.Item[\'1\']\n* UnexpectedParameter: Unexpected key \'aa\' found in params.Item[\'2\']\n* UnexpectedParameter: Unexpected key \'name\' found in params.Item[\'2\']\n* UnexpectedParameter: Unexpected key \'venue\' found in params.Item[\'2\']\n* UnexpectedParameter: Unexpected key \'day\' found in params.Item[\'2\']\n* UnexpectedParameter: Unexpected key \'time\' found in params.Item[\'2\']\n* UnexpectedParameter: Unexpected key \'type\' found in params.Item[\'2\']\n* UnexpectedParameter: Unexpected key \'interest\' found in params.Item[\'2\']\n* UnexpectedParameter: Unexpected key \'accessible\' found in params.Item[\'2\']\n* UnexpectedParameter: Unexpected key \'remote\' found in params.Item[\'2\']',


### Looking to the final assignment
sdfsdkjhfdkjshfksdjhf

### Quesions
- What are the partition calls to avoid arrors and what do they mean?