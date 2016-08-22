#! /usr/bin/node

'use strict';

/* jshint node: true */

var _ = require('lodash');

var Model = require('../models/model.js');
var Promise = require('promise');
/**
* @constructor - the utility that does all the data works
*/

function DataHandler(mongoUrl){
    this.mongoUrl = mongoUrl || 'mongodb://localhost:27017/resume';
    this.model = new Model(this.mongoUrl);
}

/**
* Get all the docs in a given collection with conditions
*
* @arg {string} - The name of the collection
* @arg {object} - The condition for mongo find
* @return {promise} - How to deal with the array of found document
*/
DataHandler.prototype.retrieveAll = function(collection, condition){
    var self = this;
    return new Promise(function(fulfill, reject){
        self.model.init().then(function(db){
            self.model.findData(db, collection, condition)
            .then(function(doc){
                fulfill(doc);
                db.close();
            })
            .catch(function(err){
                reject(new Error(err));
                db.close();
            });
        })
        .catch(function(err){
            var e = new Error(err);
            reject(e);
        });
    });
};

/**
* Create new entry to the collection
*
* @arg {string} - The name of the collection
* @arg {object} - The info to be created
* @return {promise} - How do deal with the result on success or failure
*/
DataHandler.prototype.newData = function(collection, data){
    var self = this;
    return new Promise(function(fulfill, reject){
        self.model.init().then(function(db){
            return self.model.insert(db, collection, data);
        });
    });
};


// Factory Pattern
module.exports = DataHandlerFactory;
function DataHandlerFactory(mongoUrl){
    return new DataHandler(mongoUrl);
}

