var caseModel = require('./case_model.js');
var sequelize = require('./sequelize_file.js');

var caseObj={};
caseObj.register_case = function(case_info,callback){
  //console.dir(user_info);
	caseModel
	  .create({first_name     : case_info.first_name,
             last_name      : case_info.last_name,
             dob            : case_info.dob, 
             amount         : case_info.amount,
             due_date       : case_info.due_date,
             details        : case_info.details, 
             approved       : false,
             sponsored      : false
           })
	  .then(function(case_obj) {
	     if(case_obj== null)
        callback(null);
      else
        callback('success'); 
	  }); 

};

caseObj.get = function(callback){
  sequelize
    .query('Select * from case_infos')
    .then(function(case_list) {
      callback(case_list); 
    });

};

module.exports = caseObj; 