# promise-file-uglify
Uglify a list of JavaScript files using promises for flow control.


## Installation

Install by npm.

```shell
npm install git+https://github.com/lucentminds/promise-file-uglify.git
```

### Useage:

```js
var uglify = require( 'promise-file-uglify' );

uglify( '/path/to/file.js', {} )
.then(function( oResult ){

    console.log( oResult.outcome );

});
```

## Examples

Uglify one file.

```js
uglify( '/path/to/file.js' )
.then(function( oResult ){

    console.log( oResult.outcome );

});
```
Uglify multiple files.

```js
uglify( ['/path/to/file1.js', '/path/to/file2.js'] )
.then(function( aResults ){

    console.log( 'Success!' );

});
```

## Todo

* Implement map files.