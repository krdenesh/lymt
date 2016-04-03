'use strict';
var bodyparser  = require('body-parser');
var paypal_sdk  = require('../lib/paypal_config.js');
var paymentModel= require('./sponsored_case_model.js');
var sequelize = require('./sequelize_file.js');
var url 		= require('url');

var payment ={};

payment.make_payment = function(payment_json, callback){
						paypal_sdk.payment.create(payment_json, 
						  function (error, payment) {
						    if (error) {
						        throw error;
						    } else {
						        callback(payment.links[1].href);						        							
						    }
						});
					};

payment.update_case = function(case_id, callback){
		console.log("****** update *******");
		sequelize
		    .query("Update case_infos set sponsored = true where id = " + case_id)
		    .then(function(data) {
		    	console.dir(data);
		        callback("success"); 
		    });
};

payment.record_payment = function(payment_json, callback){
	paymentModel
	  .create({
	  		 user_email     : payment_json.user_email,
             case_id        : payment_json.case_id,
             pay_id         : payment_json.pay_id
           })
	  .then(function(case_obj) {
	     if(case_obj== null)
        callback(null);
      else
      payment.update_case(payment_json.case_id,callback);
      //callback("success");
	  }); 
   };
module.exports = payment;

