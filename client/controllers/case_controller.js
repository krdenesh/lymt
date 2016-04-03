'use strict';

module.exports = function(app){


	app.controller('caseController',
					['$scope', 'resource','$routeParams',
					'$location', '$window', 'sessionService', 
					function($scope, resource, $routeParams, 
						$location, $window , sessionService){
		
		$scope.cases=[];
		//$scope.username = $routeParams.username; 
		
		var Cases = resource('cases'); 
		
		$scope.uploadDocs = function() {
						    var x = document.createElement("INPUT");
						    x.setAttribute("type", "file");
						    document.body.appendChild(x);
		};

		$scope.save_case = function(case_info){
							//console.log(" in save case");
							Cases.saveCase(case_info, function(data){
								if(data== null){
									$scope.errorhidden = true;								
									$scope.message = "Error while saving case";
								}
								if(data=='success'){
									$scope.errorhidden = true;
									$scope.message = "Case added!!!";
								}
							});	
		};	

		$scope.case_list = function(){
									Cases.case_list(function(data){
									$scope.cases = data; 
								});
				
		};

		$scope.sponsor_case = function(case_info){
								if(sessionService.get('username') == null)
									$location.path('/login');
								else
								{
									var resource = case_info;
									resource.username = sessionService.get('username');
									Cases.make_payment(resource, function(paymentUrl){
										$window.location.href = paymentUrl;
									});
								}
		};

		$scope.successful_sponsor = function(){

									var paymentObj={
										username : $routeParams.username,
										caseId	 : $routeParams.caseId,
										payId: $routeParams.payId
									};
									
									Cases.record_payment(paymentObj, function(){
										console.log("Payment is succes");
									});

		};

		$scope.sponsord_case_list = function(){
										console.log('sponsored_case_list');
		};

		


	}]);


};