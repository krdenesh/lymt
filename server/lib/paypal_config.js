var paypal_sdk = require('paypal-rest-sdk');

paypal_sdk.configure({
  'host': 'api.sandbox.paypal.com',
  'client_id': '<client-id>',
  'client_secret': '<client-secret>'
});

paypal_sdk.generate_token(function(error, token){
  if(error){
    console.error(error);
  } 
  /*else {
    console.log("Token : " +token);
    //console.dir(paypal_sdk);
  }*/
});

module.exports = paypal_sdk;