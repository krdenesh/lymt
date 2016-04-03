'use strict';
var sequelize = require('./sequelize_file.js');
var Sequelize = require('sequelize'); 

var orgModel = sequelize.define('organization_info', {

  id:{
    type          : Sequelize.INTEGER, 
    autoIncrement : true
  },

  user_id:{
    type          : Sequelize.INTEGER 
  },

  org_name:  {
    type          : Sequelize.STRING
  }
}); 

module.exports = orgModel; 



