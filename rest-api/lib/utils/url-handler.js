'use strict';

/* jshint node: true */
var _ = require('lodash');
var Promise = require('promise');
var urlTool = require('url');

/**
* @constructor - occupies a memory position for the url Handler
*/
function UrlHandler() {}
    
/**
* parse a stringified url and convert it into an object
* @param {String} url - the url string that contains everything
* @return {Promise} - what do you want to do with the url in object format.
*/  
UrlHandler.prototype.parse = function(url){
    var urlObj = urlTool.parse(url, true);
    return urlObj;
};

// Do factory pattern.
module.exports = UrlHandlerFactory;

function UrlHandlerFactory(){
    return new UrlHandler();
}


