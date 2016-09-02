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
map = L.map('map').setView([51.4, -0.09], 13); 

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

      resetMarkers();
      resetTempMarkers();

      markers = L.layerGroup([]);

      for (i=0; i < data.length; i++) {

        if (data[i].coords == null) { continue; }; // Stops loop breaking if 
                                                   // null data is present
        
        var coordsDifference = distance(coords[0], coords[1], data[i].coords[0], data[i].coords[1]);

        if (coordsDifference < radius) {
          marker = L.marker([data[i].coords[0], data[i].coords[1]])
          markers.addLayer(marker);
          console.log(markers);
          marker.addTo(map).bindPopup(
            "<div class='markerPopup'>" 
              + data[i].name  
              + "<li>"
                + `Capacity: ${data[i].capacity}/5`
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

function resetMarkers() {
  if (typeof marker !== 'undefined') {
    markers.eachLayer(function (layer) {
      map.removeLayer(layer);
    });
  };
};

function resetTempMarkers() {
  if (typeof tempMarker !== 'undefined') {
    tempMarkers.eachLayer(function (layer) {
      map.removeLayer(layer); 
    });
  };
};

function addTempMarker(lat, lng){
  tempMarkers = L.layerGroup([]);
  tempMarker = L.marker([lat, lng])

  tempMarkers.addLayer(tempMarker);
  tempMarker.addTo(map).bindPopup(
      "This is where your marker will appear once added"
      );
  map.setView([lat, lng], 13);
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
  var radius = document.querySelector("#choose-radius-text").value;
  if (radius == '') {
    return 1000
  } else {
    return Number(radius);
  };
};

function customCoords() {
  var address = document.querySelector("#choose-radius-address").value;
  if (address == '') {
    isLocationNull();
    return [userLat, userLon];
  } else {
    return coords;
  };
};

function coordsFromAddress(address) {
  var addingAddress = document.querySelector("#address").value;
  $.getJSON(
    'https://maps.googleapis.com/maps/api/geocode/json?address=' 
    + address 
    + '&key=' 
    + googleApi.key, function(data) {
      coords = [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];
  });
};

function isDataNull() {
  var name = document.querySelector("#name").value;
  var address = document.querySelector("#address").value;
  var lat = document.querySelector("#address").value;
  var lng = document.querySelector("#address").value;
  var error = "Please make sure 'Name', 'Address', 'Latitude' and 'Longitude' are filled in before submitting a new place."
  if (!name || !address || !lat || !lng){
    window.alert(error);
    return false;
  } else {
    return true;
  }
};

function isLocationNull() {
  if (typeof userLat === 'undefined') {
    window.alert("Location can not be found during search. Please enter a valid address");
  };
};

function isBoxChecked(box) {
  for (i=1; i < 6; i++) {
    if(document.querySelector(`#${box}${i}`).checked) {
      return Number(i);
    };
  };
};
// Map Functions End



// jQuery
document.querySelector("#choose-radius-address").addEventListener("keyup",
  function() {
    var address = document.querySelector("#choose-radius-address").value;
    coordsFromAddress(address);
  }
);

document.querySelector("#address").addEventListener("keyup",
  function() {
    var address = document.querySelector("#address").value;
    coordsFromAddress(address);
  }
);

document.querySelector("#choose-radius-button").addEventListener("click", 
  function() {
    resetView(customRadius(), customCoords());
    findPlaces(customRadius(), customCoords());
  }
);

document.querySelector("#generate").addEventListener("click",
  function() {
    var address = document.querySelector("#address").value;    
    coordsFromAddress(address);
    document.querySelector("#lat").value = coords[0]; 
    document.querySelector("#lng").value = coords[1]; 
    resetTempMarkers();
    addTempMarker(coords[0], coords[1]);
  }
);

document.querySelector("#add-place").addEventListener("click",
  function() {
    var name = $('#name').val();
    var capacity = isBoxChecked('capacity');
    if (isDataNull()) {
      $.ajax({
        url: '/data',
        type: 'POST',
        data: {
          'name': name,
          'lat': $( "#lat" ).val(),
          'lng': $( "#lng" ).val(),
          'capacity': capacity
        },
        success: function(){
          console.log("post worked");
          resetView(customRadius(), customCoords());
          findPlaces(customRadius(), customCoords());
        }
      })
    };
});

// jQuery End
