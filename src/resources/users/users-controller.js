"use strict";

var User = require("./users-model.js");

exports.create = function(username, password, callback) {
    var user = new User({
        username: username,
        password: password
    });

    user.save(function(err) {
        if(err) {
            if(err.name === "MongoError" && err.code === 11000) {
                //Trying to insert duplicate in mongodb.
                var error = new Error("Username already exists.");
                error.code = 3;
                callback(error);
            } else {
                callback(err);
            }

            return;
        }

        callback(null, user);
    });
};

exports.findByUsername = function(username, callback) {
    User.findOne({
        username: username
    }, callback);
};

exports.findByAccessToken = function(token, callback) {
    User.findOne({
        "accessTokens.token": token
    }, callback);
};