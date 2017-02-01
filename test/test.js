/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */

var copy = require( 'promise-file-copy' );
var uglify = require( '../promise-file-uglify' );

copy( './test/unminified.js', './test/src.js' )
.then(function( cPath ){
    return uglify( ['./test/src.js'], {
        outSourceMap: "out.js.map",
        outFileName: "out.js",
    } );

})
.then(function( aPaths ){
    console.log( aPaths );
});