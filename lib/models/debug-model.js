#! /usr/bin/node

'use strict';

/* jshint node: true */

var DataModel = require('./model.js');

var mongoUrl = 'mongodb://localhost:27017/resume';
var happyProfile = {name:'Happy', email:'happyHappy@happy.com', summary:'a dog'};

var myData = new DataModel(mongoUrl);
myData.init()
.catch(function(err){
    console.log('Error during initializing db.');
    console.log(err);
})
.then(function(db){
    myData.findData(db, 'profile', { })
    .catch(function(err){
        console.log(err);
        db.close();
    }).then(function(documents){
        console.log(documents);
        // db.close();
    });

    myData.delete(db, 'profile', {'name': 'Happy'})
    .catch(function(err){
        console.log('find error during delete Happy');
        db.close();
    })
    .then(function(res){
        console.log('Here are the result of deleting happy');
        myData.findData(db, 'profile', { })
        .then(function(documents){
            console.log(documents);
            db.close();
        });
    });
});
