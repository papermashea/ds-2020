      
    this.watered.BOOL = watered
    this.cleaned.BOOL = cleaned;
    this.substrate.S = substrate;
    this.shed.BOOL = shed;
    this.waste.N = waste.toString();
    this.light.N = light.toString();
    this.loc.S = rows.location;
    this.time.N = time.toString();
    this.notes = notes.toString();




    Item: {
        "entry": {
         N: {}
      }, 
        "date": {
         N: {}
      }, 
        "watered": {
         BOOL: {}
      }, 
        "cleaned": {
         BOOL: {}
      }, 
        "substrate": {
         S: {}
      }, 
        "shed": {
         BOOL: {}
      }, 
        "waste": {
         N: {}
      }, 
        "light": {
         N: {}
      }, 
        "location": {
         S: {}
      }, 
        "time": {
         N: {}
      }, 
        "notes": {
         S: {}
      }, 




    //////////
    // CONNECT TO DB
    //////////
    
    // AWS.config = new AWS.Config();
    // AWS.config.region = "us-east-1c";
    
    // var dynamodb = new AWS.DynamoDB();
    
    // var params = {};
    // params.Item = careData[0]; 
    // params.TableName = "careblog";
    
    // async.eachSeries(careData, function (meeting, callback){
    //   setTimeout(callback, 4000); //{ // SETTING TIMEOUT TO 4S
     
    //   let params = {
    //     Item: careData[0],
    //     TableName: 'careblog'
    //     };
    // });
      
    //   console.log(params)
    
      // ADD TO DB
        // dynamodb.putItem(params, function (err, data) { // PUTITEM ADDS EACH ITEM IN PARAMS TO DB
        // if (err) console.log(err, err.stack); // an error occurred
        // // else console.table('aaMeetings_NYC');   // PRINT TABLE NAME IF SUCCESSFUL 
        // else console.table(data);   // PRINT TABLE IN CONSOLE IF SUCCESSFUL
        //   });
    // });
      