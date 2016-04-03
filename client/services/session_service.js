'use strict';
module.exports = function(app){
	var handleError = function(data){
		console.log("handle Error"); 
		console.dir(data);
	}; 

	app.factory('sessionService', ['$http', function($http){
		return {
			set : function(key,value){
				return sessionStorage.setItem(key,value);
			},
			get : function(key){
				return sessionStorage.getItem(key);

			},
			destory : function(key){
				return sessionStorage.removeItem(key);
			},
		};
	}]);

}