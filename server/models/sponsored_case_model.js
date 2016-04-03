'use strict';
var sequelize = require('./sequelize_file.js');
var Sequelize = require('sequelize'); 

var orgModel = sequelize.define('sponsored_case_info', {

  user_email:{
    type          : Sequelize.STRING
  },

  case_id:{
    type          : Sequelize.INTEGER
  },
  pay_id:{
    type          :Sequelize.STRING
  }
}); 

module.exports = orgModel; 



