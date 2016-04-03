'use strict'; 

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var lymtApp = angular.module('lymtApp', ['ngRoute','base64','ngCookies']);

// controllers
require('./controllers/user_controller.js')(lymtApp);
require('./controllers/organization_controller.js')(lymtApp);
require('./controllers/case_controller.js')(lymtApp);

// services
require('./services/resources_routes.js')(lymtApp);
require('./services/session_service.js')(lymtApp);

//directives
//require('./views/directives/create_blog_directive.js')(blogsApp);

// Routes
lymtApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl	: './views/home.html',
		//controller 	: 'indexController'
	})
	.when('/success_stories', {
		templateUrl	: './views/success_stories.html',
		//controller 	: 'homeController'
	})
	/*.when('/organizations/:username', {

		templateUrl	: './views/organization.html',
		controller 	: 'orgController'
	})*/
	.when('/organizations', {

		templateUrl	: './views/organization.html',
		controller 	: 'orgController'
	})
	.when('/urgent_need', {

		templateUrl	: './views/urgent_need.html',
		//controller 	: 'homeController'
	})
	.when('/help_now', {

		templateUrl:'./views/case_list.html',
		controller : 'caseController'
	})
	.when('/register', {

		templateUrl	: './views/create_user.html',
		controller 	: 'userController'
	})
	.when('/login', {

		templateUrl	: './views/login.html',
		controller 	: 'userController'
	})
	.when('/about',{
		templateUrl:'./views/about.html'
	})
	.when('/new_case',{
		templateUrl:'./views/new_case.html',
		controller : 'caseController'
	})
	.when('/case_list',{
		templateUrl:'./views/case_list.html',
		controller : 'caseController'
	})
	.when('/payment_successful',{
		templateUrl:'./views/payment_successful.html',
		controller : 'caseController'
	})
	.when('/payment_failure',{
		templateUrl:'./views/payment_failure.html',
		//controller : 'caseController'
	})
	.when('/sponsored_case_list',{
		templateUrl:'./views/sponsored_case_list.html',
		//controller : 'caseController'
	})
	.when('/welcome_page',{
		templateUrl:'./views/welcome_page.html',
		//controller : 'caseController'
	})
	.when('/logout',{
		templateUrl:'./views/logout.html',
		controller : 'userController'
	})
	.otherwise({
		templateUrl:'./views/four_oh_four.html'	
	})

}]);
