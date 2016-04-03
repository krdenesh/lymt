'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var user 		= require('../models/user');
var passportLocal= require('passport-local');
var cookieParser = require('cookie-parser');
var expressSession= require('express-session');

module.exports = function(passport) {
  passport.use('basic', new BasicStrategy({}, function(email, password, done) {
    var userInfo = { 
	 				 user_email 	: email, 
	 				 user_password	: password 
	 				};

    user.login(userInfo, function(data) {
      console.log("3 server in login");
      if (data == null) return done('User does not eists')
      if (!user.validPassword(password,data.user_password)) 
            return done('Error in Password');
      return done(null, data);
    });
  }));

  passport.serializeUser(function(user_val,data){
    console.log('***in serializeuser ***');
    console.dir(user_val);

    done(null,user_val.id);
  });




};
