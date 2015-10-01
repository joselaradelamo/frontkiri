app.service('loginService', [ '$http', '$q', 'Services', 'SessionProvider', function($http, $q, Services, SessionProvider) {
	'use strict';

	function doLogin(getData) {
		var deferred = $q.defer();
		//$http.get(Services.LoginService+getData)
		$http.get('http://localhost:3000/login'+getData)
			.success(function (data, status, headers, config) {
				console.log(data);
				SessionProvider.setSessionToken(data.SessionToken);
			})
			.error(function (data, status, headers, config) {
				console.log(data);
			});
	}

	this.doLogin = function(getData) {
		return doLogin(getData);
	};
}]);