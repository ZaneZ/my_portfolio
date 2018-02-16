#! /usr/bin/env node

'use strict';

/* jshint node: true */

var bodyParser = require('body-parser');
var Data = require('./lib/utils/data-handler.js');
var express = require('express');
var Promise = require('promise');
var path = require('path');
var _ = require('lodash');

var urlHandler = require('./lib/utils/url-handler.js');

var app = express();

var data = Data();
var urlParser = urlHandler();
var base = '/api/0.1/';


app.use(bodyParser.json());

app.get(path.join(base, '/'), function(req,res){
    res.send('Hello, you are having good connections!');
});

app.get(path.join(base, '/profiles'), function(req, res){
    var details = urlParser.parse(req.url);
    data.retrieveAll('profile', details.query)
    .then(function(doc){
        var repJson = JSON.stringify(doc);
        console.log(doc);
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

app.put(path.join(base, '/profile/new'), function(req, res){
    data.newData('profile', req.body)
    .then(function(result){
        console.log(Object.keys(result).length);
        res.send(result);
    }).catch(function(err){
        console.log(err);
        res.send(JSON.stringify(err));
    });
});

/**
* GET: /education
* get education background with query
*/

app.get(path.join(base, '/education'), function(req,res){
    var details = urlParser.parse(req.url);

    if (_.isEmpty(details.query)) {
        var repJSON = {
            status: "error",
            detail: "cannot look up education with empty query"
        };
        return res.send(JSON.stringify(repJSON));
    }

    data.retrieveAll('profile', details.query)
    .then(function(doc){
        console.log(JSON.stringify(doc));
        if (_.isEmpty(doc)){
            var repJSON = {
                status: "ok",
                detail: "The record queried does not exist."
            };
            res.send(JSON.stringify(repJSON));
            throw new Error('No-Record');
        }
        else if ( doc.length > 1 ){
            var replyMultiRes = {
                status: "ok",
                message: "Found multiple record by criteria. Which one do you want?",
                details: doc
            };
            res.send(JSON.stringify(replyMultiRes));
            throw new Error('MultiRecord');
        }
        var query = {};
        query._id = doc[0]._id;
        return data.retrieveAll('education', query);
    })
    .then(function(doc){
        res.send(JSON.stringify(doc));
    })
    .catch(function(err){
        if (err.message == 'No-Record' || err.message == 'MultiRecord'){
            console.log(err.message);
        }
        else {
            var message = "error ecountered during look up\n";
            console.log(message, err.message);
            var repErr = {
                status: 'error',
                details: message + err
            };
            res.send(JSON.stringify(repErr));
        }
    });
});

/**
* GET: /educations/<userId> 
* Get education background
*/
app.get(path.join(base, '/education/:id'), function(req, res){
    var query = {};
    query._id = parseInt(req.params.id);

    if (! _.isInteger(query._id)) {
        var repErr = {
            "status": "error",
            "detail": "id can only be integer"
        };
        res.send(JSON.stringify(repErr));
    }

    data.retrieveAll('education', query)
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

app.get(path.join(base, '/work-experience'), function(req,res){
    var details = urlParser.parse(req.url);

    if (_.isEmpty(details.query)) {
        var repJSON = {
            status: "error",
            detail: "cannot look up education with empty query"
        };
        return res.send(JSON.stringify(repJSON));
    }

    data.retrieveAll('profile', details.query)
    .then(function(doc){
        console.log(JSON.stringify(doc));
        if (_.isEmpty(doc)){
            var repJSON = {
                status: "ok",
                detail: "The record queried does not exist."
            };
            res.send(JSON.stringify(repJSON));
            throw new Error('No-Record');
        }
        else if ( doc.length > 1 ){
            var replyMultiRes = {
                status: "ok",
                message: "Found multiple record by criteria. Which one do you want?",
                details: doc
            };
            res.send(JSON.stringify(replyMultiRes));
            throw new Error('MultiRecord');
        }
        var query = {};
        query._id = doc[0]._id;
        return data.retrieveAll('profession', query);
    })
    .then(function(doc){
        res.send(JSON.stringify(doc));
    })
    .catch(function(err){
        if (err.message == 'No-Record' || err.message == 'MultiRecord'){
            console.log(err.message);
        }
        else {
            var message = "error ecountered during look up\n";
            console.log(message, err.message);
            var repErr = {
                status: 'error',
                details: message + err
            };
            res.send(JSON.stringify(repErr));
        }
    });
});


/**
* GET: /work-experience/<userId>
* Get Professional background
*/
app.get(path.join(base, '/work-experience/:id'), function(req, res){
    var query = {};
    query._id = parseInt(req.params.id);
    if (! _.isInteger(query._id)) {
        var repErr = {
            "status": "error",
            "detail": "id can only be integer"
        };
        res.send(JSON.stringify(repErr));
    }

    data.retrieveAll('profession', query)
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

