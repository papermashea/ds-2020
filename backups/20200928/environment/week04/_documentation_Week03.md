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

***

## Data

### RegEx and string cleanup
I got really caught up in trying to clean up the location data after noticing the general messiness and realizing how annoying that would be to parse. I ended up using regEx to fix my tabs, no break spaces, and carriage returns. I was also attempting to clean up all the location data in between the parenthesis and found regEx difficult to apply to the content _in between_ said parenthesis. I was removing the parenthesis rather than the entire string contents within them. In the end, my parsed text was a lot easier to work with.

### Locations vs. Addresses
I differentiated between "locations" and "addresses" in my attempt to parse just the street address and zip codes - "locations" being general location strings with the details i.e. (basement) or (between 6th+7th) still included. I attempted to used locations.split("'",[0]), along with locations.slice(), and locations.susbstring to push to addresses. 

***

## API pulling

### Test success
I was able to pull with the starter code as well as from my own txt file successfully to produce test json outputs. I really wanted to work with the cleaned address data from there.

### Calling APIs
After success with the starter code, I tried using my locations array, assuming there would only be 74 calls as I knew there to be 74 meetings in my zone03.txt. I was wrong, 2,218 calls were made, and I will have to make a new account for next week.

***
## Assignment Output

### JSON file
When I examine my json file in sublime text with the package "pretty json", it's showing a lot of errors due to the junk we haven't cleaned out yet, but street addresses, city, and state are on-point. I believe the street address and zip code would be enough for accurate geodata.

### Future strings
Given that address combined with city, state or with just zip code would be plenty to pull accurate geodata, I hope to scrape zip codes from the addresses string or to parse them by selecting numerical strings of 5 numbers each.

### Errors
A lot of errors in my accidentally ambitious locations pull look like this:

    "FeatureMatchingResultType": "BrokenTie"
    "ExceptionOccured": "False",
    "RegionSizeUnits": "Meters",

### Quesions
- How do you work with a .env file in a different directory?
- Which is better to pursue, .split or .substring?
- How do you set a hard cap on # of calls?
