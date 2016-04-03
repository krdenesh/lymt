'use strict';
var express      	= require('express'); 
var pg 				= require('pg');
var app  			= express();
var passport 		= require('passport');
var orgRoutes		= require('./server/routes/organization.js')
var paymentRoutes   = require('./server/routes/payment.js')
var caseRoutes		= require('./server/routes/case.js')
var router  		= express.Router(); 

	app.use('/api/v1', router); 
	app.use(express.static(__dirname+"/build"));
	app.set('appSecret', process.env.SECRET || 'changethischangethis!');
	
	app.use(passport.initialize());
	require('./server/lib/passport_strat')(passport);
	
	var userRouter  = express.Router();
	var orgRouter   = express.Router();
	var caseRouter  = express.Router();
	var payRouter   = express.Router();
	
	require('./server/routes/user')(userRouter,passport, app.get('appSecret'));
	orgRoutes(router);
	caseRoutes(router);
	paymentRoutes(router);
	
	app.use('/api/v1', userRouter); 
	app.use('/api/v1', orgRouter);
	app.use('/api/v1', caseRouter);
	app.use('/api/v1',payRouter);

	app.listen(process.env.PORT || 3000, function(){
	  console.log('server listening on port' + (process.env.PORT || 3000));
	});


