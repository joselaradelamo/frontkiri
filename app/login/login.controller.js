app.controller('LoginController', ['$scope', 'loginService', function($scope, loginService){
	'use strict';

	$scope.loginAction = function() {
		loginService.doLogin('?login='+$scope.credentials.username+'&password='+$scope.credentials.password);
	};

	//$scope.loginAction();

}]);
