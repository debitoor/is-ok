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
		var result, callback;

		before(function(done) {
			callback = spy();

			request.get(url, function(err, response) {
				result = isOk(response, callback);
				done(err);
			});
		});

		it('should return true', function() {
			expect(result).to.equal(true);
		});

		it('should not have called callback', function() {
			expect(callback).not.to.have.been.called;
		});
	});

	describe('getting non-successful response', function() {
		var result, error, callback;

		before(function(done) {
			callback = spy(function(err) {
				error = err;
			});

			request.get(url + '/not_found', function(err, response) {
				result = isOk(response, callback);
				done(err);
			});
		});

		it('should return false', function() {
			expect(result).to.equal(false);
		});

		it('should have called callback once', function() {
			expect(callback).to.have.been.called.once;
		});

		it('should have called callback with error with not found status code', function() {
			expect(error).to.have.property('statusCode', 404);
		});

		it('should have called callback with error with response body', function() {
			expect(error).to.have.property('body', 'Not Found');
		});

		it('should have called callback with error with response headers', function() {
			expect(error)
				.to.have.property('headers')
				.to.containSubset({
					'content-type': 'text/plain',
					'content-length': '9'
				});
		});
	});
});
