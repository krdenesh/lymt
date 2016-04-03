var userModel = require('./user_model.js');
var sequelize = require('./sequelize_file.js');
var organizationModel = require('./organization_model.js');
var bcrypt    = require('bcrypt');
var eat       = require('eat'); 


var user={};
user.registerUser = function(user_info,callback){
  //console.dir(user_info);
	userModel
	  .create({user_name      : user_info.user_name,
             user_email     : user_info.user_email, 
             is_org_flag    : user_info.is_org_flag,
             user_password  : user_info.user_password
           })
	  .then(function(user_value) {
	    //callback(user.dataValues.id); 
     if(user_info.is_org_flag== true){
      organizationModel
        .create({
                  user_id   : user_value.dataValues.id,
                  org_name  : user_info.org_name
                })
        .then(function(org){
              user_info.user_password = null; 
              user_value.dataValues.user_password = null;
              callback(user_value.dataValues);
        });
      }
      else
      {
        callback(user_value.dataValues);
      }
	  });

};
user.getUser = function(id,callback){
  sequelize
    .query('Select id, user_name from user_infos where id='+id)
    .success(function(user_val) 
    {
      console.dir(user_val[0][0]);
      callback(null, user_val[0][0]); 
    });

};

user.login = function(user_info,callback){
  sequelize
    .query('Select id, user_email,user_name, user_password '+
            'from user_infos where user_email = \''+user_info.user_email+'\'',  { type: sequelize.QueryTypes.SELECT})
    .then(function(user_val) 
      {
      console.log(" user_val:" + JSON.stringify(user_val, null, 4));
      console.log("[0][1]"+ user_val[0]);
      if(user_val[0] == null)
        callback(null);
      else
        callback(user_val[0]); 
      }
  );

};

user.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

user.validPassword = function(password,returnPassword) {
  return bcrypt.compareSync(password, returnPassword);
};

user.generateToken = function(appSecret,req_id ,callback) {
  console.log('this.id ==>'+ req_id);
  eat.encode({id: req_id, timestamp: new Date()}, appSecret, callback);
};

module.exports = user; 