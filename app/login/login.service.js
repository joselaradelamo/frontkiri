app.service('loginService', [ '$http', '$q', 'Services', function($http, $q, Services) {
	'use strict';

	function doLogin(getData) {
		var deferred = $q.defer();
		var login = 'jseijas@sopra.com';
		var password = 'exsopra123';
		//$http.get(Services.LoginService+getData)
		$http.get('http://localhost:3000/login'+getData)
			.success(function (data, status, headers, config) {
				console.log(data);
			})
			.error(function (data, status, headers, config) {
				console.log(data);
			});
	}

	this.doLogin = function(getData) {
		return doLogin(getData);
	};
}]);