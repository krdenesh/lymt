'use strict';
var sequelize = require('./sequelize_file.js');
var Sequelize = require('sequelize'); 

var userModel = sequelize.define('user_info', {

  id:{
	type		      : Sequelize.INTEGER, 
  autoIncrement : true,
  get 		      : function(){
      					return this.getDataValue('id');
      				}
	},
  user_name :  {
    type      : Sequelize.STRING,
    allowNull : false,
    set       : function(val) {
                  this.setDataValue('user_name', val);},  
    get       : function()  {
                  return this.getDataValue('user_name');
                }
  },
  user_email:  {
    type     	: Sequelize.STRING,
    allowNull	: false,
    set 		  : function(val) {
    				      this.setDataValue('user_email', val);},  
    get      	: function()  {
    				      return this.getDataValue('user_email');
        				}
  },

  user_password: {
    type     	: Sequelize.STRING,
    allowNull	: false,
    set      	: function(val) {
    			      this.setDataValue('user_password', val);
    			    }
  },

  is_org_flag	: {
    type     	    : Sequelize.BOOLEAN,
    dafaultValue  :false,
    set      	    : function(val) {
      				      this.setDataValue('is_org_flag', val);
      				    },
    get      	    : function()  {
      				      return this.getDataValue('is_org_flag');
          				}
  }
}); 

module.exports = userModel; 



