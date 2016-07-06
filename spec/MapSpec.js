describe("Map Functions", function() {

  var Map = require('../client/public/scripts/classes/Map.js');
  var map;

  describe("customCoords()", function() {

    beforeEach(function() {
      map = new Map();
      address = '';
      userLat = 1.1;
      userLon = 1.2;
    });
    
    it("should return user latlon if no address is provided", function() {
      expect(map.customCoords(address)).toEqual([userLat, userLon]);
    });

  
  }); 
});
