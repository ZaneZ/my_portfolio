#! /usr/bin/node

'use strict';

/* jshint node: true */

var bodyParser = require('body-parser');
var Data = require('./lib/utils/data-handler.js');
var express = require('express');
// var Model = require('./lib/models/model.js');
var Promise = require('promise');
var urlHandler = require('./lib/utils/url-handler.js');

var app = express();
var data = Data();
var urlParser = urlHandler();

app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send('Hello, World');
});

app.get('/profiles', function(req, res){
    var details = urlParser.parse(req.url);
    
    data.retrieveAll('profile', details.query)
    .then(function(doc){
        var repJson = JSON.stringify(doc);
        res.send(repJson);
    })
    .catch(function(err){
        console.log('Error happened, ', err);
        var repErr = {
            result: "Error Happened",
            detail: err
        };
        res.send(JSON.stringify(repErr));
    });
});

app.put('/profile/new', function(req, res){
    data.newData('profile', req.body)
    .then(function(result){
        res.send(result);
        db.close();
    }).catch(function(err){
        console.log(err);
        res.send(JSON.stringify(err));
    });
});


/*
   app.put('/profile/new', function(req, res){
    data.init()
    .then(function(db){
        return new Promise(function(fulfill){
            data.insert(db, 'profile', req.body);
            fulfill(db);
        });
    })
    .then(function(db){
        var result = {
            detail: req.body,
            summary: 'New profile created successfully!'
        };
        var strRes = JSON.stringify(result); 
        res.send(strRes);
        db.close();
    })
    .catch(function(err) {
        res.send(JSON.stringify(err));
        console.log(err);
    });
*/

/**
* Main Logic for the server.
*/
// app.listen(8081);

var server = app.listen(8081, function () {
    console.log("Example app listening at http://%s:%s", server.address().address, server.address().port);
});

