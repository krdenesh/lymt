'use strict';
var bodyparser  = require('body-parser');
var user 		= require('../models/user.js');
//var passport	= require('passport');
var passportLocal= require('passport-local');
var cookieParser = require('cookie-parser');
var expressSession= require('express-session');


module.exports = function(app, passport, appSecret) {
	

	app.use(cookieParser());
	app.use(expressSession({secret: process.env.SESSION_SECRET|| appSecret ,
			resave: false,
			saveUninitialized: false
		}));
	app.use(bodyparser.json());
	// cookie parser, body parser and express session need to be defined before passport
	app.use(passport.initialize());
	app.use(passport.session());

	app.post('/create_user', function(req, res) {
		//console.log("Server: create user");
	 	var userInfo = { 
	 				 user_name		: req.body.full_name,
	 				 user_email 	: req.body.username, 
	 				 user_password	: user.generateHash(req.body.password),
	 				 is_org_flag	: req.body.is_org_flag,
	 				 org_name		: req.body.org_name
	 				};

		user.registerUser(userInfo,function(val){
			 if (!val) return res.status(500).send({msg: 'could not create user'});	
			 user.generateToken(appSecret, val.id, function(err, token) {
		        if (err) return res.status(500).send({msg: 'could not generate token'});
		        		res.json({eat: token, user:val});
		      		});
		}); 
	});

	app.get('/login', passport.authenticate('basic', {session: false}), 
                                                        function(req, res) {                                                                                                
	    user.generateToken(appSecret,req.user.id, function(err, token) {
	    	//console.log("2 server: token="+ token);
	      if (err) return res.status(500).send({msg: 'could not generate token'});
	      req.user.user_password = null;
	      res.json({eat: token, user:req.user});
	    })
	  });

}