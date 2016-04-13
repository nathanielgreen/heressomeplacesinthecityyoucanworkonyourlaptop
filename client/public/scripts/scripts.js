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

          var markers = L.marker([data.places[i].coords[0], data.places[i].coords[1]])
          markers.addTo(map).bindPopup(
            "<div class='markerPopup'>" 
              + data.places[i].name  
            + "</div>"
          );

        } 
        else { 
          console.log('marker not placed, place is out of chosen radius');
        }; // End of if statement

      }; // End of for loop

    });
};
// Marker Placement



// Add New Places
function addPlaces() {
  $.getJSON("dummydata.json", function(data) {

    var newPlace = { "name":"test", "coords":[1, 2] };

    data.places.push(newPlace);

    $.post('dummydata.json', newPlace)
    .success(function(){
      alert('Your Changes have been saved to database');
    });
  });
};
// Add New Places End



// Map Functions + jQuery

function deletePolygon(myid) {
  map.removeLayer(myid);
  return false;
};

function resetView(radius) {
  if (typeof circle !== 'undefined') {
    deletePolygon(circle);
  };
  circle = L.circle([userLat, userLon], radius, {
    color: '#3b1261',
    fillColor: '#3b1261',
    fillOpacity: 0.1
  });
  circle.addTo(map);
  map.setView([userLat, userLon], 17); 
};

$( "#find-me-button" ).click(function() {
  console.log("findme worked");
  resetView(1000);
  findPlaces(1000);
  map.setView([userLat, userLon], 14); 
});

$( "#choose-radius-button" ).click(function() {
  var chosenRadius = $( '#choose-radius-text' ).val(); 
  resetView(chosenRadius);
  findPlaces(chosenRadius);
});

$( "#add-new-button" ).click(function() {
  addPlaces();
});
// Map Function + jQuery End



