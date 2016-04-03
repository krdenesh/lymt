'use strict';
var bodyparser  = require('body-parser');
var paypal	    = require('../models/payment.js');
var url         = require('url');




module.exports = function(app) {
	app.use(bodyparser.json());
	app.post('/make_payment', function(req, res) {
        var success_url = "http://localhost:3000/#/payment_successful?username="+
                            req.body.username+"&caseId="+req.body.id;
        var payment_json = {
                            "intent": "authorize",
                            "payer": {
                                "payment_method": "paypal"
                            },
                            "redirect_urls": {
                                "return_url": success_url,
                                "cancel_url": "http://localhost:3000/#/payment_failure"
                            },
                            "transactions": [{
                                "item_list": {
                                    "items": [{
                                        "name": "sponsor:"+ req.body.first_name + " "+ req.body.last_name,
                                        "price": req.body.amount,
                                        "currency": "USD",
                                        "quantity": "1"
                                      
                                    }]
                                },
                                "amount": {
                                    "currency": "USD",
                                    "total": req.body.amount
                                },
                                "description": "This is the payment description."
                            }]
                        };
    		paypal.make_payment(payment_json, function(payment_url){
                res.json(payment_url);
        });
      
	});
    
    app.post('/record_payment', function(req, res){
        var sponsored_payment = {
                                    user_email : req.body.username,
                                    case_id    : req.body.caseId,
                                    pay_id     : req.body.payId
                            };
            paypal.record_payment(sponsored_payment, function(status){
                //console.log(status);
                res.json(status);
        });
    });


}