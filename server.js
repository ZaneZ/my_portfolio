#! /usr/bin/node

'use strict';

/* jshint node: true */

var express = require('express');
var Model = require('./lib/models/model.js');
var urlHandler = require('./lib/utils/url-handler.js');

var app = express();
var data = new Model('mongodb://localhost:27017/resume');
var urlParser = urlHandler();

app.get('/', function(req,res){
    res.send('Hello, World');
});

app.get('/profiles', function(req, res){
    var details = urlParser.parse(req.url);
    data.init()
    .then(function(db){
        data.findData(db, 'profile', details.query)
        .then(function(doc){
            var resJson = JSON.stringify(doc);
            res.send(resJson);
            db.close();
        });
    })
    .catch(function(err) {
        console.log(err);
    });
});

/**
* Main Logic for the server.
*/

var server = app.listen(8081, function () {                                     
    console.log("Example app listening at http://%s:%s", server.address().address, server.address().port);
});
