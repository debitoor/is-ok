var request = require('request');
var server = require('./server');

var isOk = require('../');

describe('is ok', function() {
	var app, url;

	before(function(done) {
		app = server(done);
	});

	before(function() {
		url = 'http://localhost:' + app.address().port;
	});

	after(function(done) {
		app.close(done);
	});

	describe('getting successful response', function() {
		var result;

		before(function(done) {
			request.get(url, function(err, response) {
				result = isOk(response);
				done(err);
			});
		});

		it('should not return an error', function() {
			expect(result).not.to.be.ok;
		});
	});

	describe('getting non-successful response', function() {
		var result, callback;

		before(function(done) {
			callback = spy();

			request.get(url + '/not_found', function(err, response) {
				result = isOk(response, callback);
				done(err);
			});
		});

		it('should return an error with not found status code', function() {
			expect(result).to.have.property('statusCode', 404);
		});

		it('should return an error with response body', function() {
			expect(result).to.have.property('body', 'Not Found');
		});

		it('should return an error with response headers', function() {
			expect(result)
				.to.have.property('headers')
				.to.containSubset({
					'content-type': 'text/plain',
					'content-length': '9'
				});
		});

		it('should have called callback once', function() {
			expect(callback).to.have.been.called.once;
		});

		it('should have called callback with error', function() {
			expect(callback).to.have.been.calledWith(result);
		});
	});
});
