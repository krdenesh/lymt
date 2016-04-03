	'use strict';

module.exports = function(app){

	app.controller('userController',
					['$scope', 'resource','$routeParams','$route',
					 '$location','$cookies','sessionService', '$window',  
					function($scope, resource, $routeParams, $route,
							 $location, $cookies, sessionService, $window){
			//---- Navigation bar (set login logout) ----
			if(sessionService.get('username') != null)
				$scope.loginStatus = true;
			else
				$scope.loginStatus = false;
			//-------------------------------------------
		var User 		   = resource('user'); 
		$scope.errorhidden = false; 
		$scope.create_new_user = function(newUser){
				User.save(newUser, function(data){
					$cookies.eat = data.eat;
					$scope.loginStatus = true;
					sessionService.set('username',newUser.username);
					$location.path('/welcome_page');
					$window.location.reload();
				});
			};
		$scope.login 	= function(user){
				User.login(user, function(data){
					if(data == null){
						$scope.errorhidden = true;
					 	$scope.message = "Invalid Email and Password. Please try again.";
			      		}
					else{
						$cookies.eat = data.eat;
						sessionService.set('username',user.username);
						$scope.loginStatus = true;
						$location.path('/welcome_page');
						$window.location.reload();
						;
					}
				});
			};
		$scope.logout 	= function(){
							sessionService.destory('username');
							if($scope.loginStatus == true){
								$scope.loginStatus = false;
								$window.location.reload();
							}	
			};
		$scope.helpnow  = function(){
							$location.path('/help_now');
		};
	}]);


};