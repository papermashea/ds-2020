# Week 12: Iterating on final projects

***
## Assignment 1: AA Meetings

### Site setup
- node already installed
- install handlebars with npm install --save handlebars
- install express with npm install --save express express-handlebars
- live reload from tutorial: npm i -g nodemon
	nodemon app.js
- browserify: https://www.npmjs.com/package/browserify
- package.json vs package lock https://dltlabs.medium.com/package-json-vs-package-lock-json-c8d5deba12cb
- content security policy https://www.npmjs.com/package/content-security-policy
	https://content-security-policy.com/examples/express-js/
	https://developers.google.com/web/fundamentals/security/csp	
- csp middleware for express: https://www.npmjs.com/package/express-csp-header
	npm i express-csp-header
	https://stackoverflow.com/questions/56191364/how-to-configure-csp-headers-with-express-node-js
	https://stackoverflow.com/questions/56386307/loading-of-a-resource-blocked-by-content-security-policy
- helmet for csp: https://stackoverflow.com/questions/21048252/nodejs-where-exactly-can-i-put-the-content-security-policy
	npm install helmet --save
	https://helmetjs.github.io/
- Running on AWS: https://docs.aws.amazon.com/cloud9/latest/user-guide/sample-nodejs.html


Learn Handlebars:
- https://www.sitepoint.com/a-beginners-guide-to-handlebars/
- https://stackabuse.com/guide-to-handlebars-templating-engine-for-node/
wow what a terrible name

### Map setup
Leaflet plugin for handlebars: https://github.com/ebrelsford/Leaflet.handlebars
Mapbox styles: mapbox://styles/papermashea/cki6v60o21lgr19plgjgs87o4
Tutorial express + leaflet: https://github.com/ryerson-ggl/tutorial-express-leaflet

Organizing CSS in express is weird

<img src="images/AA_Map_v1-1.png" alt="AA Meetings" title="All-Access AA Meetings" width="800px"/>

### Cleanup

### Future implementation
https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#circle

**Decisions & Questions:**
- Do zones actually add anything to the interface?
- How often are users looking for specific meeting information?
- Can remote locations be joined?
- How many meetings will overlap in one location?



***
## Assignment 2: Process Blog

### Setup
- https://www.npmjs.com/package/simple-express-handlebars-boilerplate 
	npm i simple-express-handlebars-boilerplate --save
	cp to final2
- npm install jquery
- npm install aws-sdk
- example handlebars precompiler

### Cleanup
![Process Blog Analysis Data](images/PB_dataTypes.png "PB Snake Care")

**Decisions & Questions:**
- Do the circles make sense for qualitative and quantitative data?
- What sources can I cite for healthy care data?
- Are statuses feasible?



***
## Assignment 3: Internet of things

### Setup
- npm i
- npm ci
- npm i simple-express-handlebars-boilerplate --save
- npm i d3 --save

### Cleanup


**Decisions & Questions:**
- How easy will it be to manipulate the data collected from the Photon?
- What language will I use to visualize the data?
- Can I embed google forms to collect care data?

