[![NPM](https://nodei.co/npm/command-buffer.png?downloads=false&stars=false)](https://npmjs.org/package/command-buffer) [![NPM](https://nodei.co/npm-dl/command-buffer.png?months=6)](https://npmjs.org/package/command-buffer)

`command-buffer` is a simple command buffer abstraction library written in JavaScript.


## Usage

### Browser

```html
<script type="text/javascript" src="command-buffer.js"></script>
```

### Node.js

    $ npm install command-buffer

```js
var CommandBuffer = require('command-buffer');
```

### Sample Code

```js
var commands = new CommandBuffer(function (type, data) {
	switch (type) {
	case 'send':
		console.log(data);
		break;
	default:
		break;
	}
}, this);

commands.add('send', 'something');
commands.pause();
commands.add('send', 'something else');
commands.add('send', 'something else again');
commands.resume();
```


### API

#### General

```js
var commands = new CommandBuffer(callback);  // callback = function (type, data) {}
commands.add(type, data);
commands.pause();
commands.resume();
```


## Credits

  See the [contributors](https://github.com/pilwon/command-buffer/graphs/contributors).


## License

<pre>
The MIT License (MIT)

Copyright (c) 2013 Pilwon Huh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre>