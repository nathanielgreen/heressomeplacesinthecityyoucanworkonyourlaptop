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



// isEmpty Function
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {
  if (obj == null) return true;
  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }
  return true;
};
// isEmpty Function End



// Marker Placement
function findPlaces(radius, coords) {

    $.getJSON('/data', function(data) {

      if (typeof marker !== 'undefined') {
        markers.eachLayer(function (layer) {
          map.removeLayer(layer);
        });
      };

      markers = L.layerGroup([]);

      for (i=0; i < data.length; i++) {

        if (data[i].coords == null) { continue; };
        
        var coordsDifference = distance(coords[0], coords[1], data[i].coords[0], data[i].coords[1]);
        if (coordsDifference < radius) {

          marker = L.marker([data[i].coords[0], data[i].coords[1]])
          markers.addLayer(marker);
          console.log(markers);
          marker.addTo(map).bindPopup(
            "<div class='markerPopup'>" 
              + data[i].name  
              + "<li>"
                + data[i].notes
              + "</li>"
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



// Map Functions
function deletePolygon(myid) {
  map.removeLayer(myid);
  return false;
};

function resetCircle() {
  if (typeof circle !== 'undefined') {
    deletePolygon(circle);
  };
};

function resetView(radius, address) {
  resetCircle();
  circle = L.circle(address, radius, {
    color: '#3b1261',
    fillColor: '#3b1261',
    fillOpacity: 0.1
  }).addTo(map);
  map.setView(address, 13);
};

function customRadius() {
  var radius = $( '#choose-radius-text' ).val();
  if (radius == '') {
    return 1000
  } else {
    return Number(radius);
  };
};

function customCoords() {
  var address = $( '#choose-radius-address' ).val();
  if (address == '') {
    return [userLat, userLon]
  } else {
    return coords;
  };
};

function coordsFromAddress(address) {
  $.getJSON(
    'https://maps.googleapis.com/maps/api/geocode/json?address=' 
    + address 
    + '&key=' 
    + googleApi.key, function(data) {
      coords = [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
  });
};
// Map Functions End



// jQuery
$( "#choose-radius-address" ).keyup(function() {
  var address = $( "#choose-radius-address" ).val();
  coordsFromAddress(address);
});

$( "#choose-radius-button" ).click(function() {
  resetView(customRadius(), customCoords());
  findPlaces(customRadius(), customCoords());
});

$( "#address" ).keyup(function() {
  var address = $( "#address" ).val();
  coordsFromAddress(address);
});

$( "#generate" ).click(function() {
  var address = $( "#address" ).val();
  coordsFromAddress(address);
  $( "#lat" ).val(coords[0]);
  $( "#lng" ).val(coords[1]);
});

$( "#add-place" ).click(function() {
  var name = $('#name').val();
  if (name != "") {
    $.ajax({
      url: '/data',
      type: 'POST',
      data: {
        'name': name,
        'lat': $( "#lat" ).val(),
        'lng': $( "#lng" ).val(),
        'notes': $( "#notes" ).val(),
      },
      success: function(){
        console.log("post worked");
      }
    })
  }; 
});

// jQuery End
