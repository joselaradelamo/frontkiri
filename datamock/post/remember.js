(function () {
	'use strict';

	var faker = require('faker');

	module.exports = {
	    path: '/remember',
	    requireParameters: ['data'],
	    template: function (params, query, body) {
	    	var data = query.data;

	    	if(data === 'admin' || data === 'admin@aqualogy.com') {
	    		var success = {response: true};
	    		return success;
	    	} else {
	    		throw (401);
	    	}
	    }
	};

})();