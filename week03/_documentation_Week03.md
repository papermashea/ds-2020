# Week 3: API referencing

## Assignment Notes 
I watched Aaron's videos multiple times, but still managed to almost max out my credits in ATM. I understand it's not ethical and not best practices, but I've made a new account for next week's work.

***

## Setup

### Setting up the environmental variables
The concept behind .env files makes sense to me as well as the need to protect certain variables, but I'm still unclear as to how I can refernce a .env file not located in the director I am in. Is it secure enough in my working directory as a hidden file?
I originally kept my .env folder out of my week03 directory as I was worried about privacy, but I do realize that it is hidden and ended up moving it to my working directory since I couldn't figure out how to reference it elsewhere.

### Configuring the API
Configuring my account and API url was also easy enough as I have previous experience in URL querying. I set an alert to tell me when I had only 250 credits left. I found the website somewhat hard to use but in general there are a lot of tools they offer.

	// TAMU API KEY
	dotenv.config();
	const API_KEY = process.env.TAMU_KEY;
	const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'


***

## Data

### RegEx and string cleanup
I got really caught up in trying to clean up the location data after noticing the general messiness and realizing how annoying that would be to parse. I ended up using regEx to fix my tabs, no break spaces, and carriage returns. I was also attempting to clean up all the location data in between the parenthesis and found regEx difficult to apply to the content _in between_ said parenthesis. I was removing the parenthesis rather than the entire string contents within them. In the end, my parsed text was a lot easier to work with.

### Locations vs. Addresses
I differentiated between "locations" and "addresses" in my attempt to parse just the street address and zip codes - "locations" being general location strings with the details i.e. (basement) or (between 6th+7th) still included. I attempted to used locations.split("'",[0]), along with locations.slice(), and locations.susbstring to push to addresses. 

	// SCRAPE GENERAL LOCATION DATA
	let locations = [];

	// REMOVE EMPTY EXCESS HTML
	$('.detailsBox').empty(); //removing details
	$('h4').empty(); //removing locations
	$('b').empty(); //removing meeting names
	$('img').empty(); //removing images + wheelchair text
	$('a').empty(); //removing meeting names
	$('span').empty(); //removing random spans

	// USE REGEX TO REPLACE TABS/NOBREAK SPACES/RETURNS, ANYTHING IN PARENTHESIS
	$('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').each(function(i, elem) {
	  locations.push($(elem).text().replace(/(\t|\n|\r)/gm, "").replace(/\s*\(.*?\)\s*/g, '').trim());
	    // console.log(locations)

	// USE SPLIT TO PULL JUST ADDRESSES
	let locData = locations.split(",");
	let addresses = []
	$(locations).split(",").pop().each(function(i, elem) { 
	  addresses.push($(elem.text().trim()))
	  console.log(addresses)
	  });
	  
	});


***

## API pulling

### Test success
I was able to pull with the starter code as well as from my own txt file successfully to produce test json outputs. I really wanted to work with the cleaned address data from there.

### Calling APIs
After success with the starter code, I tried using my locations array, assuming there would only be 74 calls as I knew there to be 74 meetings in my zone03.txt. I was wrong, 2,218 calls were made, and I will have to make a new account for next week.

	// TAMU API KEY
	dotenv.config();
	const API_KEY = process.env.TAMU_KEY;
	const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

	// ADDRESSES
	let meetingsData = [];
	let addresses = ['7 East 10th Street, 2nd Floor, 10003','155 East 22nd Street, Basement,NY 10010','61 Fourth Avenue, 3rd Floor, 9th & 10th St 10003,'];
	// console.log(addresses)

	// eachSeries in the async module iterates over an array and operates on each item in the array in series
	// async.eachSeries(locations, function(value, callback) { //LOCATIONS MADE ME RUN OUT OF CREDITS (I thought there would only be 74 calls!)
	async.eachSeries(addresses, function(value, callback) {
	    let query = {
	        streetAddress: value,
	        city: "New York",
	        state: "NY",
	        apikey: API_KEY,
	        format: "json",
	        version: "4.01"
	    };

***
## Assignment Output

### JSON file
When I examine my json file in sublime text with the package "pretty json", it's showing a lot of errors due to the junk we haven't cleaned out yet, but street addresses, city, and state are on-point. I believe the street address and zip code would be enough for accurate geodata.

### Future strings
Given that address combined with city, state or with just zip code would be plenty to pull accurate geodata, I hope to scrape zip codes from the addresses string or to parse them by selecting numerical strings of 5 numbers each.

### Errors
A lot of errors in my accidentally ambitious locations pull look like this:

    ``` FeatureMatchingResultType": "BrokenTie" ```
    ``` ExceptionOccured": "False", ```
    ``` RegionSizeUnits": "Meters", ```


	    // construct a querystring from the `query` object's values and append it to the api URL
	    let apiRequest = API_URL + '?' + querystring.stringify(query);

	    request(apiRequest, function(err, resp, body) {
	        if (err){ throw err; }

	        let tamuGeo = JSON.parse(body);
	        console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
	        meetingsData.push(tamuGeo);
	    });

	    // sleep for a couple seconds before making the next request
	    setTimeout(callback, 2000);
	}, function() {
	    fs.writeFileSync('data/addressTest.json', JSON.stringify(meetingsData));
	    console.log('*** *** *** *** ***');
	    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
	  });


### Quesions
- How do you work with a .env file in a different directory?
- Which is better to pursue, .split or .substring?
- How do you set a hard cap on # of calls?
