'use strict';
var bodyparser  = require('body-parser');
var caseObj = require('../models/case.js');


module.exports = function(app) {
	app.use(bodyparser.json());
	app.post('/save_case', function(req, res) {
		//console.log("in save_case");
		var caseInfo = { 
	 				 first_name		: req.body.first_name,
	 				 last_name		: req.body.last_name, 
	 				 dob			: req.body.dob,
	 				 amount			: req.body.amount,
	 				 due_date		: req.body.due_date,
	 				 details		: req.body.details
	 				};

		caseObj.register_case(caseInfo,function(val){
			        		console.log(val);
			        		res.json(val);
		      		});
	});

	app.get('/case_list', function(req, res) {
		//console.log("in case_list");
		caseObj.get(function(data){
			console.dir(data);
			res.json(data[0]);
		});
	});

	
}