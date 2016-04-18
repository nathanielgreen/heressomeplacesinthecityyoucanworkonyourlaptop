var express   = require('express');
var router    = express.Router();
var path      = require('path');
var pg        = require('pg');
var dbFile = require('../../conString');

router.get('/', function(req, res, next) {

  res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
  
});

router.get('/data', function(req, res, next) {

  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(dbFile.conString, function(err, client, done) {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }

      var query = client.query("SELECT * FROM locations;");

      // Stream results back one row at a time
      query.on('row', function(row) {
          results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
          done();
          return res.json(results);
      });

  });

});

module.exports = router;
