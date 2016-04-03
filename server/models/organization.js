
var sequelize = require('./sequelize_file.js');
var organizationModel = require('./organization_model.js');


var organization={};

organization.get = function(callback){
  sequelize
    .query('Select org_name from organization_infos')
    .then(function(organizations) {
      callback(organizations); 
    });

};

module.exports = organization; 