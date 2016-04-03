'use strict';
var eat 	= require('eat');
//var User 	= require('./server/models/user_model');
var user 		= require('./server/models/user.js');

module.exports = function(appSecret){
	return function(req, res, next){
		var token = req.header.eat || req.body.eat; 
		if(!token) return res.status(430).send({msg:'could not authenticate'}); 

		eat.decode(token, appSecret, function(err, decoded) {
	      if (err) return res.status(403).send({msg: 'could not authenticate'});
			user.getUser(decoded.id, function(data){
				
		        if (data == null) return res.status(403).send({msg: 'could not authenticate'});
		        req.user = data;
		        next();
	      });
	    });
  };
};
	