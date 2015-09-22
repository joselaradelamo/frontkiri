(function () {
	'use strict';

	var faker = require('faker');

	module.exports = {
	    path: '/user-password',
	    requireParameters: ['password'],
	    template: function(params, query, body) {
	    	var password = query.password;
    		if(password === 'admin') {
	    		var userInfo = {
					id: 7, 
					username: faker.Internet.userName(),
	    			email: faker.Internet.email(),
	    			password: 'admin'
	    		};
	    		return userInfo;	
    		} else {
    			throw (401);
    		}
	    }
	};

})();