// // Import the leaflet package
// var L = require('leaflet');

// // Creates a leaflet map binded to an html <div> with id "map"
// // setView will set the initial map view to the location at coordinates
// // 13 represents the initial zoom level with higher values being more zoomed in
// var map = L.map('map').setView([43.659752, -79.378161], 20);

// // Adds the basemap tiles to your web map
// // Additional providers are available at: https://leaflet-extras.github.io/leaflet-providers/preview/
// L.tileLayer('https://api.mapbox.com/styles/v1/papermashea/cki6v60o21lgr19plgjgs87o4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoicGFwZXJtYXNoZWEiLCJhIjoiY2szbnh6bGI4MXY1cjNjbjFkMnZvcjQ1ayJ9.MKO-bDpbg-5sZ2sIN8MJ5Q'
// }).addTo(mymap);

// // Adds a popup marker to the webmap for GGL address
// L.circleMarker([43.659752, -79.378161]).addTo(map)
// 	.bindPopup(
// 		'Test Popup'
// 	)
// 	.openPopup();