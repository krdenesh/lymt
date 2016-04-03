'use strict';
var bodyparser  = require('body-parser');
var organization= require('../models/organization.js');


module.exports = function(app) {
	app.use(bodyparser.json());
	app.get('/org_info', function(req, res) {
		console.dir(organization);
		organization.get(function(data){
			//console.dir(data[0])
			res.json(data[0]);
			
		});
	});
}