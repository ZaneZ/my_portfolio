/*jshint node: true*/

"use strict";

var _ = require('lodash');
var assert = require('assert');
var emitter = require('events').EventEmitter;
var mongoClient = require('mongodb').MongoClient;
var Promise = require('promise');

module.exports = Data;

function Data(url){
    var self = this;
    self.url = url;
}

/**
* find whatever with given condition and collection
* @return {Promise} - what to do with result or error
*/

Data.prototype.findData = function(db, strCollectionName, objCondition){
    var collection = db.collection(strCollectionName);
    return new Promise(function(fulfill, reject){
        collection.find(objCondition).toArray(function(err, documents){
            if (_.isEmpty(err)){
                fulfill(documents);
            }
            else {
                reject(err);
            }
        });
    });
};

/**
* insert a new doc
* @return {Promise} - waht to do with the result object or error
*/

Data.prototype.insert = function(db, strCollectionName, objData) {
    var collection = db.collection(strCollectionName);
    return new Promise(function(fulfill, reject){
        collection.insertOne(objData, function(err, result) {
            if (_.isEmpty(err)){
                fulfill(result);
            }
            else {
                reject(err);
            }
        });
    });
};

/**
* @return {Promise} How to deal with the result object.
*/

Data.prototype.update = function(db, strCollectionName, objCondition, objOperations) {
    var collection = db.collection(strCollectionName);
    var options = {
        upsert: false,
        wtimeout: 2000
    };

    return new Promise(function(fulfill, reject){
        collection.updateMany(objCondition, objOperations, options, function(err, result){
        if (_.isEmpty(err)){
            fulfill(result);
        }
        else {
            reject(err);
        }
        });
    });
};

/**
* Delete a document in collection
* @return {Promise} How to deal with the result object.
*/
Data.prototype.delete = function(db, strCollectionName, objCondition) {
    var collection = db.collection(strCollectionName);

    return new Promise(function(fulfill, reject){
        collection.deleteMany(objCondition, function(err, result){
            if (_.isEmpty(err)){
                fulfill(result);
            }
            else {
                reject(err);
            }
        });
    });
};

/**
* @return {Promise} what to do with db and Error.
*/

Data.prototype.init = function(){
    var self = this;

    return new Promise(function(fulfill, reject){
        mongoClient.connect(self.url, function(err, db){
            if (err !== null) {
                reject(err);
            }
            else {
                fulfill(db);
            }
        });
    });
};

