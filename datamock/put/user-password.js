(function () {
	'use strict';

	var faker = require('faker');

	module.exports = {
	    path: '/user-password',	    
	    template: function(params, query, body) {
    		var userInfo = {
				id: 7, 
				username: faker.Internet.userName(),
				email: faker.Internet.email(),
				password: query.password
			};
			return userInfo;	
	    }
	};

})();