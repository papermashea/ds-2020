# Zone 03 Cleanup

## Assignment Notes
In response to the question "why are we reading this from a saved text file instead of making another HTTP request?" - I think that the reason we save the files locally rather than working on them while calling to them every time is to save technical energy. Operating on the locally saved files saves load time going back and forth between the client/server (similar to fonts, though best practices is to use webfonts now since they are client-side).

The starter code ran without issue, and I ended up checking out "https://www.w3schools.com/js/js_string_methods.asp" and "https://api.jquery.com/attr/" for additional string methods research.

***

## Investigation

### Exploring in the browser
As my student ID number is N00697093, I worked with 03.txt, listing AA meetings for Zone 3. 
I first took a look at "https://parsons.nyc/aa/m03.html" from the week01 assignment. It's hard to tell if the page is broken in multiple ways or if my 3+ ad blockers are breaking it, so I checked it in incognito mode in Chrome, Firefox, and Safari. The page seems broken in multiple ways.

It was easiest for me to visually parse the relevant information for each meeting by looking in the browser. The relevant information for each meeting seems to break down into the following categories (or "options", in the filters):
	
	- Meeting title
	- Location 
	- Address
	- Meeting day
	- Meeting time
	- Special interest
	- Wheelchair accessible
	- Notes (in the grey boxes i.e. 'detailsBox') - this is inconsistent at best and are more often confusing than helpful; the most helpful pieces of information in these boxes are usually also listed in the "Special interest" category

### Examining the saved html
I then made a new folder for the cleaned data as I presume we will eventually be cleaning up all the data files. I saved my 03.txt document as an html into a the new folder in /data/ called /aa-clean/. By saving it as an html file, I was able to examine the colored syntax more easily than viewing the page source in the browser. 

After by passing the inline styles (ew), it appeared that basically every single element was hardcoded. The locations are stored as h4 tags with hardcoded breaks and bolds. I believe there are 74 meetings listed on this page based on the presence of 74 tr opening tags and 74 h4 opening tags.

Fortunately, the locations are the only h4s. Unfortunately, the addresses specifically have no identifiers and the "Get Directions" links are also broken.

***

## Parsing the content

### Using text methods to collect addresses
I am looking for everything that exists after an h4, break, bold text, another break. Alternately, I could wish I could select any "<td style="border-bottom:1px solid #e3e3e3; width:260px" valign="top">".

#### Trying to add classes for addresses
Also found that there was no point in inserting html to create a class for addresses as there was no consistent HTML element to prepend a closing tag to (i.e. detailsBox wasn't always available to push a closing tag to). Plus, it felt pretty hacky.

	** Ideal Method **
	1. Get a whole text string of all the tds with the width 260
	2. Remove location, meetings names, lines breaks and detailsBox
	3. Wrap each address in a new class 

#### Selecting tr/td
I tried pulling all the 'tr td' and the console log was pulling for about 10 minutes, a lot of gibberish. Oops. After reading the cheerio documentation more closely, I have decided to grab all of the contents of the tds with widths of 260 and clean them up from there.

		// PULL LOCATIONS
	let locations = []; 
	$('h4').each(function(i, elem) {
	  locations.push( $(elem).text().trim() );
	    console.log(locations)
	});

	$('h4').addClass('location')

	// PULL MEETING NAMES
	let mtgName = [];
	$('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').find('b').each(function(i, elem) {
	  mtgName.push( $(elem).text().trim());
	    // console.log(mtgName)
	});

	// REMOVE SELECTOR ATTEMPT
	let locAdd = [];
	$('h4').remove('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').each(function(i, elem) {
	  locAdd.push( $(elem).text().trim());
	    // console.log(locAdd)
	});

#### Selectors missing the mark
I found that it was extremely easy to use .remove, .find and others to parse elements with the literally any objects/styling to them. Addresses were hard because they're just floating, alone in a string.

	// TRYING TO ADD A CLASS FOR ADDRESSES
	let addresses = []
	$('</b><br />').after('<div class="address').before.each(function(i, elem) {
	  addresses.push( $(elem).html().trim());
	    console.log(locAdd)

	// PULL ADDRESSES
	let addresses = [];

	$('.detailsBox').empty(); //removing details
	$('h4').empty(); //removing locations
	$('b').empty(); //removing meeting names
	$('img').empty(); //removing images + wheelchair text
	$('a').empty(); //removing meeting names
	$('span').empty(); //removing random spans
	$('\n').replaceWith(""); //replacing random line breaks
	$('\n\t\t\t\t\t\t').replaceWith(""); //replacing random line breaks
	$('\n\t\t\t\t\t\t').remove(); //What IS this
	// $('\n'+'\t').replaceWith(""); //
	// $("\t").replaceWith(""); //
	// $("\t").remove(); //


	// $("h4","b","img","a","span",".detailsBox").empty(); // Why can't I combine .empty selectors?
	// $('h4','b','img','a','span','.detailsBox').empty(); // Do quotes/apostrophes make a difference?


	// ADDING A CLASS TO ADDRESSES
	$('td[style*="border-bottom:1px solid #e3e3e3; width:260px"]').remove('\n\t\t\t\t\t\t').addClass('address').each(function(i, elem) {
	  addresses.push( $(elem).text().trim());
	    // console.log(addresses)
	});

***

## Assignment Output

### Saving the file
I was able to export several other asset types before I was able to save the addresses simply because they were easier to select. I have saved zone03-addresses.txt for the assignment.

	// WRITE ADDRESSES TO NEW DOCUMENT
	fs.writeFileSync('data/aa-clean/zone03-addresses.txt', addresses.join("\n"));

### Selecting the unselectable
Ultimately, with this kind of cleanup, I think we were asked to work on addresses specifically because they were impossible to select on their own. There may be a way to select the text between two breaks, etc. within the strings, but I found working with Cheerio to be easier since the data was so inconsistent.

### Quesions
- Could you load just the specific tds as cheerio objects?
- Which way does .remove work?
- What does normalize whitespace do?
- Why can I not combine selectors for ".empty"?
- How do I get rid of \t and \n more effectively?
- Why is .trim not removing \n?
- Is there a better way to use map for this?