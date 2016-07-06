function Map() {
}
Map.prototype.customCoords = function() {
  if (address == '') {
    return [userLat, userLon]
  } else {
    return coords;
  };
};

module.exports = Map;
