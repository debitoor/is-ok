# is-ok [![Build Status](https://travis-ci.org/e-conomic/is-ok.svg)](https://travis-ci.org/e-conomic/is-ok)

Check if a HTTP response is successful.

	npm install is-ok

## Usage

Used together with [request](https://github.com/request/request) or the built-in `http` module.

Accepts a response object, with a `statusCode` property, as first argument and returns either an error object with `statusCode`, `headers` and `body` property copied from the response, or `undefined` if the status code is within the `2xx` range.

Optionally it takes a callback as second argument, which is called only if the response is non-successful.

```javascript
var request = require('request');
var isOk = require('is-ok');

var fetch = function(url, callback) {
	request.get(url, function(err, response, body) {
		if(err) return callback(err);
		if(!isOk(response, callback)) return;

		callback(null, body);
	});
}
```

## License

[MIT](http://opensource.org/licenses/MIT)
