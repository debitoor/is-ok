var http = require('http');

var OK = 'Ok';
var NOT_FOUND = 'Not Found';

module.exports = function(callback) {
	var server = http.createServer(function(request, response) {
		if(request.url === '/') {
			response.writeHead(200, {
				'Content-Type': 'text/plain',
				'Content-Length': OK.length
			});

			return response.end(OK);
		}

		response.writeHead(404, {
			'Content-Type': 'text/plain',
			'Content-Length': NOT_FOUND.length
		});

		response.end(NOT_FOUND);
	});

	server.listen(0, function() {
		callback(null, server);
	});

	return server;
};
