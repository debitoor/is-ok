# is-ok [![Build Status](https://travis-ci.org/e-conomic/is-ok.svg)](https://travis-ci.org/e-conomic/is-ok)

Check if a HTTP response is successful.

	npm install is-ok

## Usage

Used together with [request](https://github.com/request/request) or the built-in `http` module.

Accepts a response object, with a `statusCode` property, as first argument and returns `true` if the status code was within the `2xx` range, otherwise it returns `false`.

Optionally it takse a callback as second argument, which is called with an error object only if the response was non-successful. The error has `statusCode`, `headers` and `body` properties set, copied from the response.

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
