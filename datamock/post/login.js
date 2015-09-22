(function () {
	'use strict';

	var faker = require('faker');

	function guid() {
	    var d = new Date().getTime();
	    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
	    });
	    return uuid;
	};

	module.exports = {
	    path: '/login',
	    requireParameters: ['username', 'password'],
	    template: function(params, query, body) {
	    	var username = query.username,
	    		password = query.password;

	    	if(username === 'admin' && password === 'admin') {
	    		var session = {
		    		sessionId: function() {
		    			return guid();	    			
		    		},
		    		info : {
		    			id: 7,
		    			username: faker.Internet.userName(),
		    			firstname: faker.Name.firstName(),
		    			lastname: faker.Name.lastName(),
		    			email: faker.Internet.email(),
		    			address: faker.Address.streetName()
		    		}
				};

				return session;
	    	} else {
	    		throw (401);
	    	}
	    }
	};

})();