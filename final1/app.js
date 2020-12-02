const express = require('express');
const exphbs = require('express-handlebars');
const {expressCspHeader, INLINE, NONE, SELF} = require('express-csp-header');

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

app.use(expressCspHeader({
    policies: {
        'default-src': [SELF],
        'img-src': [SELF],
    }
}));

// HTTP response header will be defined as:
// "Content-Security-Policy: default-src 'none'; img-src 'self';"


// const publicPath = path.resolve(__dirname, "public");

// app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});

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