[![NPM version](https://img.shields.io/npm/v/platform-tools/rx-extensions.svg?style=flat-square)](https://www.npmjs.com/package/platform-tools/rx-extensions)
[![Dependency Status](https://img.shields.io/gemnasium/Carrooi/Js-RxAjax.svg?style=flat-square)](https://gemnasium.com/Carrooi/Js-RxAjax)
[![Build Status](https://img.shields.io/travis/Carrooi/Js-RxAjax.svg?style=flat-square)](https://travis-ci.org/Carrooi/Js-RxAjax)

[![Donate](https://img.shields.io/badge/donate-PayPal-brightgreen.svg?style=flat-square)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WWGYRW56TBG9J)

# Rx-Ajax

Super simple (but advanced) ajax reactive library. Using [RxJS](https://github.com/Reactive-Extensions/RxJS).
Supports sending files.

## Installation

```
$ npm install platform-tools/rx-extensions
```

## Usage

```js
import {Http} from 'platform-tools/rx-extensions';

let http = new Http;
let data = {number: 5};
let options = {};

http.request('/users', 'GET', data, options).subscribe((response) => {
	console.log(response.json());
});
```

### Shortcuts

```js
http.get('/api', data, options).subscribe((response) => {});
http.post('/api', data, options).subscribe((response) => {});
http.files('/api', filesList, data, options).subscribe((response) => {});
```

### Options

* `jsonp`: name of callback for jsonp requests, when `true` is given callback name is used. Default is `false`
* `jsonPrefix`: prefix for json requests. Read more [here](http://stackoverflow.com/questions/2669690/why-does-google-prepend-while1-to-their-json-responses). Default is `null`
* `mimeType`: Default is `null`
* `headers`: List of headers to be send to server. Default is `{}`
* `files`: List of files to be send to server. Default is `[]`

## Queue

By default all your requests are called from queue one by one, so there is always just one request running (or zero).
Inspiration is from this article [http://blog.alexmaccaw.com/queuing-ajax-requests](http://blog.alexmaccaw.com/queuing-ajax-requests).

You can disable this feature with `ImmediateQueue`:

```js
import {Http} from 'platform-tools/rx-extensions';
import {ImmediateQueue} from 'platform-tools/rx-extensions/queue';

let http = new Http({
	queue: new ImmediateQueue
});
```

## Events

```js
http.send.subscribe(function(response, request) {
    console.log('In any moment, new http request will be send to server');
});

http.afterSend.subscribe(function(response, request) {
    console.log('I just sent some request to server, but there is still no response');
});

http.success.subscribe(function(response, request) {
    console.log('I have got response from server without any error :-)');
});

http.error.subscribe(function(err, response, request) {
    console.log('Sorry, there was some error with this response');
});
```

## Extensions

Sometimes it will be better to register whole group of events and this group is called extension.

```js
import {AbstractExtension} from 'platform-tools/rx-extensions/extensions';
import {Request, Response} from 'platform-tools/rx-extensions';

class CustomExtension extends AbstractExtension
{

	public send(request: Request): void
	{
		// todo
	}

	public afterSend(request: Request): void
	{
		// todo
	}

	public success(response: Response): void
	{
		// todo
	}

	public error(err: Error): void
	{
		// todo
	}

}

// ...

http.addExtension(new CustomExtension);
```

### Built in extensions

#### Links

This extension listen for all click events on `A` tags with `ajax` class and call them via ajax.

```js
import {Links} from 'platform-tools/rx-extensions/extensions';

http.addExtension(new Links);
```

#### Loading

```js
import {Loading} from 'platform-tools/rx-extensions/extensions';

http.addExtension(new Loading);
```

#### Offline

This extension tests if your favicon.ico is accessible. You can change test destination by specifying Offline's
constructor argument.

```js
import {Offline} from 'platform-tools/rx-extensions/extensions';

http.addExtension(new Offline);

http.connected.subscribe(function() {
    alert("We're online again :-)");
});

http.disconnected.subscribe(function() {
    alert('Lost internet connection');
});
```

#### Redirect

If your server sends json data with redirect variable, then you will be redirected to address in this variable.

```js
import {Redirect} from 'platform-tools/rx-extensions/extensions';

http.addExtension(new Redirect);
```

#### Snippets

If there is `snippets` object in response data with html id and content pairs, then this extension will iterate through 
this object, find element in page with given id and change content of given element into the one from response data.

```js
import {Snippets} from 'platform-tools/rx-extensions/extensions';

http.addExtension(new Snippets);
```

## Known limitations

* All non ASCII chars (eg. letters with diacritics) in file names is converted to ASCII chars before uploading.
