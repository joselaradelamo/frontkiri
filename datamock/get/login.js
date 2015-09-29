(function () {
	'use strict';

	var faker = require('faker');

	module.exports = {
	    path: '/login',
	    requireParameters: ['password'],
	    template: function(params, query, body) {
	    	var password = query.password;
    		if(password === 'exsopra123') {
	    		var userInfo = {
					id: 1, 
					Name: 'Jesus Seijas',
	    			Email: 'jseijas@gmail.com',
	    			SessionToken: '03a6b5d463ad4eaea0b0bf6afdc0af49'
	    		};
	    		return userInfo;	
    		} else {
    			throw (401);
    		}
	    }
	};

})();