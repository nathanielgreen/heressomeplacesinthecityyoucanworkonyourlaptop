var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');


router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});
