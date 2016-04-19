var express = require('express');
var router  = express.Router();
var path    = require('path');
var pg      = require('pg');
var app     = express();
var port    = process.env.PORT || 8080;
var bodyParser = require('body-parser')

var routes = require('./server/routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'express');

pg.defaults.ssl = true;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './client', 'public')));
app.use('/', routes);

app.listen(port);
console.log('listening on port ' + port);

module.export = app;
