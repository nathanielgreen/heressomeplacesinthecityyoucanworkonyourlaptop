// Geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Browser doesn't support geolocation");
    }
};
function showPosition(position, callback) {
  userLat = position.coords.latitude
  userLon = position.coords.longitude
};

getLocation();
// Geolocation End



// Map Creation
map = L.map('map').setView([51.4, -0.09], 16); 

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: mapBoxAccount.attribution,
    maxZoom: 18,
    id: mapBoxAccount.id,
    accessToken: mapBoxAccount.accessToken 
}).addTo(map);
// Map Creation End



// Haversine Function
function deg2rad(deg) {
  return deg * Math.PI / 180
}

function distance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d*1000; // Distance *1000 to get metres
}
// Haversine Function End



// Marker Placement
function findPlaces(chosenRadius) {
    $.getJSON("dummydata.json", function(data) {

      for (i=0; i < data.places.length; i++) {

        var coordsDifference = distance(userLat, userLon, data.places[i].coords[0], data.places[i].coords[1]);

        if (coordsDifference < chosenRadius ) {
        
        } 
        else { 
          console.log('marker not placed, place is out of chosen radius');
        }; // End of if statement

      }; // End of for loop

    });
};
// Marker Placement



// Map Functions + jQuery
function resetView(radius) {
  var circle = L.circle([userLat, userLon], radius, {
      color: '#4c4d57',
      fillColor: '#4c4d57',
      fillOpacity: 0.5
  });
  circle.addTo(map);
  map.setView([userLat, userLon], 4); 
};

$( "#find-me-button" ).click(function() {
  console.log("findme worked");
  resetView(1000);
  findPlaces(1000);
  map.setView([userLat, userLon], 14); 
});

$( "#discover" ).click(function() {
  findPlaces(9999999999999999999999);
  map.setView([51.518935, -0.076443], 20); 
});
// Map Function + jQuery End
