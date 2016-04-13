var express = require('express');
var router = express.Router();
var path = require('path');
var pg      = require('pg');
var app     = express();
var port    =   process.env.PORT || 8080;

var routes = require('./server/routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'express');

pg.defaults.ssl = true;

var conString = "postgres://hpchhhzyxtkexx:0CmZrYqQZj8nOgAxGg4rbogbsK@ec2-54-225-111-9.compute-1.amazonaws.com/d83qed9k3bsji";


pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
    //output: 1
  });
  client.query("SELECT * FROM places", function(err, result) {
    console.log(result.rows);
  });
});


app.use('/', routes);

// Stylesheets + Scripts
app.use(express.static(path.join(__dirname, './client', 'public')));

app.listen(port);
console.log('listening on port ' + port);

module.export = app;
