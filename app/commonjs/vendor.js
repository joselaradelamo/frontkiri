(function(){
	'use strict';

	var vendor = angular.module('vendor', []);

	function SessionProvider() {
		function SessionManager() {
			var _storage;

			try {
				if(sessionStorage.getItem) {
					_storage = sessionStorage;
				}

			} catch(e) {
				_storage = {};
			}

			this.setSessionToken = function(sessionToken) {
				_storage.sessionToken = sessionToken;
			};

			this.getSessionToken = function() {
				return _storage.sessionToken;
			};
		}

		var sessionManager = new SessionManager();

		this.$get = function() {
			return sessionManager;
		};
	}

	vendor.provider('SessionProvider', SessionProvider);

})();