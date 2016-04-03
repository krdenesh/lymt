'use strict';
var sequelize = require('./sequelize_file.js');
var Sequelize = require('sequelize'); 

var caseModel = sequelize.define('case_info', {

  id:{
    type          : Sequelize.INTEGER ,
    autoIncrement : true
  },

  first_name:{
    type          : Sequelize.STRING
  },
  
  last_name:{
    type          : Sequelize.STRING
  },
  dob:{
    type          : Sequelize.DATE
  },
  amount:{
    type          : Sequelize.INTEGER
  },
  due_date:{
    type          : Sequelize.DATE
  },
  details:{
    type          : Sequelize.STRING
  },
  approved:{
    type          : Sequelize.BOOLEAN
  },
  sponsored:{
    type          : Sequelize.BOOLEAN
  },
}); 

module.exports = caseModel; 

