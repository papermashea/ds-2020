const routeHome = (req, res, next) => {
  const context = {
    name: 'Nick',
    date: new Date()
  }
  res.render('home', context)
}

module.exports = routeHome

app.get('/processblog', function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    var params = {
        TableName : "processblog-new",
        KeyConditionExpression: "pk = :primaryKey", // the query expression
        ExpressionAttributeValues: { // the query values
            ":primaryKey": {S: "teaching"}
        }
    };

    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw (err);
        }
        else {
            res.end(pbtemplate({ pbdata: JSON.stringify(data.Items)}));
            console.log('3) responded to request for process blog data');
        }
    });
});