(function () {
	'use strict';

	var faker = require('faker');

	module.exports = {
	    path: '/user-info',
	    requireParameters: ['UserId'],
	    template: function(params, query, body) {
	    	var UserId = query.UserId;
    		if(UserId === '7') {
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