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

      var query = client.query("SELECT * FROM places;");

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


router.post('/data', function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var id = req.params.todo_id;

  // Grab data from http request
  var data = {text: req.body, complete: req.body}
  console.log(data);

// Get a Postgres client from the connection pool
  pg.connect(dbFile.conString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).send(json({ success: false, data: err}));
    }

    // SQL Query > Update Data
    client.query("INSERT INTO places(name, coords, capacity) values($1, array[$2, $3], $4)", [data.text.name, data.text.lat, data.text.lng, data.text.capacity]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM places");

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
