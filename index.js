#! /usr/bin/node

'use strict';

/* jshint node: true */

var bodyParser = require('body-parser');
var Data = require('./lib/utils/data-handler.js');
var express = require('express');
var Promise = require('promise');
var urlHandler = require('./lib/utils/url-handler.js');

var _ = require('lodash');
var app = express();
var data = Data();
var urlParser = urlHandler();

app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send('Hello, you are having good connections!');
});

app.get('/profiles', function(req, res){
    var details = urlParser.parse(req.url);

    data.retrieveAll('profiles', details.query)
    .then(function(doc){
        var repJson = JSON.stringify(doc);
        res.send(repJson);
    })
    .catch(function(err){
        console.log('Error happened, ', err);
        var repErr = {
            result: "error",
            detail: err
        };
        res.send(JSON.stringify(repErr));
    });
});

/*
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
*/

/**
* GET: /education
* get education background with query
*/

app.get('/education', function(req,res){
    var details = urlParser.parse(req.url);

    if (_.isEmpty(details.query)) {
        var repJSON = {
            status: "error",
            detail: "cannot look up education with empty query"
        };
        res.send(JSON.stringify(repJSON));
    }
    
    data.retrieveAll('profiles', details.query)
    .then(function(doc){
        if (_.isEmpty(doc)){
            var repJSON = {
                status: "ok",
                detail: "The record queried does not exist."
            };
            res.send(JSON.stringify(repJSON));
        }
        else if ( doc.length > 1 ){
            var replyMultiRes = {
                status: "ok",
                message: "Found multiple record by criteria. Which one do you want?",
                details: doc
            };
                
            res.rend(JSON.stringify(replyMultiRes));
        }
        else {
            var query = {};
            query._id = doc[0]._id;
            return data.retrieveAll('educations', query);
        }
    })
    .then(function(doc){
        res.send(JSON.stringify(doc));
    })
    .catch(function(err){
        var message = "error ecountered during look up\n";
        console.log(message, err);
        var repErr = {
            status: 'error',
            details: message + err
        };
        res.send(JSON.stringify(repErr));
    });
});

/**
* GET: /educations/<userId> 
* Get education background
*/
app.get('/educations/:id', function(req, res){
    var query = {};
    query._id = parseInt(req.params.id);

    if (! _.isInteger(query._id)) {
        var repErr = {
            "status": "error",
            "detail": "id can only be integer"
        };
        res.send(JSON.stringify(repErr));
    }

    data.retrieveAll('educations', query)
    .then(function(doc){
        var repJSON = JSON.stringify(doc);
        res.send(repJSON);
    })
    .catch(function(err){
        console.log('Error happened, ', err);
        var repErr = {
            result: "error",
            detail: err
        };
        res.send(JSON.stringify(repErr));
    });
});

/**
* GET: /work-experience
* get working background with query
*/

app.get('/work-experience', function(req,res){
    var details = urlParser.parse(req.url);

    if (_.isEmpty(details.query)) {
        var repJSON = {
            status: "error",
            detail: "cannot look up education with empty query"
        };
        res.send(JSON.stringify(repJSON));
    }
    
    data.retrieveAll('profiles', details.query)
    .then(function(doc){
        if (_.isEmpty(doc)){
            var repJSON = {
                status: "ok",
                detail: "The record queried does not exist."
            };
            res.send(JSON.stringify(repJSON));
        }
        else if ( doc.length > 1 ){
            var replyMultiRes = {
                status: "ok",
                message: "Found multiple record by criteria. Which one do you want?",
                details: doc
            };
                
            res.rend(JSON.stringify(replyMultiRes));
        }
        else {
            var query = {};
            query._id = doc[0]._id;
            return data.retrieveAll('workExperiences', query);
        }
    })
    .then(function(doc){
        res.send(JSON.stringify(doc));
    })
    .catch(function(err){
        var message = "error ecountered during look up\n";
        console.log(message, err);
        var repErr = {
            status: 'error',
            details: message + err
        };
        res.send(JSON.stringify(repErr));
    });
});

/**
* GET: /work-experience/<userId>
* Get Professional background
*/
app.get('/work-experience/:id', function(req, res){
    var query = {};
    query._id = parseInt(req.params.id);
    if (! _.isInteger(query._id)) {
        var repErr = {
            "status": "error",
            "detail": "id can only be integer"
        };
        res.send(JSON.stringify(repErr));
    }

    data.retrieveAll('workExperiences', query)
    .then(function(doc){
        var repJSON = JSON.stringify(doc);
        res.send(repJSON);
    })
    .catch(function(err){
        console.log('Error happened, ', err);
        var repErr = {
            result: "error",
            detail: err
        };
        res.send(JSON.stringify(repErr));
    });
});

/**
* Main Logic for the server.
*/

var server = app.listen(8081, function () {
    console.log("Example app listening at http://%s:%s", server.address().address, server.address().port);
});

