var util = require('util');

var noop = function() {};

module.exports = function(response, callback) {
	callback = callback || noop;

	var status = response.statusCode;
	var valid = (/2\d\d/).test(status);

	if(!valid && callback) {
		var message = util.format('Non-successful response code (%s)', status);
		var err = new Error(message);
		err.statusCode = status;
		err.headers = response.headers;
		err.body = response.body;
		callback(err);
	}

	return valid;
};
