const express = require('express');
const exphbs = require('express-handlebars');
// const csp = require('content-security-policy');
// const {expressCspHeader, INLINE, NONE, SELF} = require('express-csp-header');
const csp = require('helmet-csp')

const app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.use(express.static('public'));

// NPM CONTENT SECURITY POLICY
// const cspPolicy = {
//   'report-uri': '/reporting',
//   'default-src': csp.SRC_NONE,
//   'script-src': [ csp.SRC_SELF, csp.SRC_DATA ]
// };
 
// const globalCSP = csp.getCSP(csp.STARTER_OPTIONS);
// const localCSP = csp.getCSP(cspPolicy);
 
// // This will apply this policy to all requests if no local policy is set
// app.use(globalCSP);
 
// app.get('/', (req, res) => {
//   res.send('Using global content security policy!');
// });
 
// // This will apply the local policy just to this path, overriding the globla policy
// app.get('/local', localCSP, (req, res) => {
//   res.send('Using path local content security policy!');
// });




// HELMET
app.use(csp({
    directives: {
      "default-src": ["'none'"],
      "style-src": ["'self'", "stackpath.bootstrapcdn.com", "api.mapbox.com"],
      "script-src": ["'self'", "stackpath.bootstrapcdn.com", "api.mapbox.com"],
      "img-src": ["'self'"],
    },
  })
);

// app.use(helmet.noSniff());


//EXPRESSCSP
// app.use(express.static(__dirname + '/'));

// app.use(expressCspHeader({
//     policies: {
//         'default-src': [NONE],
//         'img-src': [SELF],
//     }
// }));

// HTTP response header will be defined as:
// "Content-Security-Policy: default-src 'none'; img-src 'self';"


// const publicPath = path.resolve(__dirname, "public");

// app.use(express.static(publicPath));



//* MAP JS *//
// var	mymap = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://api.mapbox.com/styles/v1/papermashea/cki6v60o21lgr19plgjgs87o4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoicGFwZXJtYXNoZWEiLCJhIjoiY2szbnh6bGI4MXY1cjNjbjFkMnZvcjQ1ayJ9.MKO-bDpbg-5sZ2sIN8MJ5Q'
// }).addTo(mymap);



app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});

