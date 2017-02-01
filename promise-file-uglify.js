/**
 * 02-01-2017
 * The best app ever..
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */

var Q = require( 'q' );
var write = require( 'promise-file-write' );
var resolve = require( 'promise-resolve-path' );
var uglifyJs = require( 'uglify-js' );

var uglify = module.exports = function( aSrc, oOptions ){ // jshint ignore:line
    var deferred = Q.defer();
    var cSrcType = typeof aSrc;

    // Determines the uglify options.
    oOptions = oOptions || {};

    switch( true ) {
    case ( cSrcType === 'string' ):
        aSrc = [aSrc];
        break;

    case Array.isArray( aSrc ):
        break;

    default:
        deferred.reject( 'Invalid source path argument: '.concat( aSrc ) );
        return deferred.promise;

    }// /switch()
    
    resolve( aSrc, true )
    .then(function( aPaths ){
        var i, l = aPaths.length;
        var aPromises = [];
        var cPath;

        // Loop over each file path and read it's file.
        for( i = 0; i < l; i++ ) {
            cPath =  aPaths[ i ];
            aPromises.push( uglifyOneFile( cPath, oOptions ) );
        }// /for()
        
        // Either wait for all paths to be read or reject one.
        return Q.all( aPromises );
    })
    .then(function( aResults ){
        var i, l, aPath, aOutcome;

        if( cSrcType === 'string' )  {
            deferred.resolve( aResults[0] );
        }
        else {
            l = aResults.length;
            aPath = [];
            aOutcome = [];

            // Loop over each file path and read it's file.
            for( i = 0; i < l; i++ ) {
                aPath.push( aResults[ i ].path );
                aOutcome.push( aResults[ i ].result );
            }// /for()

            deferred.resolve({
                paths: aPath,
                outcomes: aOutcome
            });
        }
    })
    .fail(function( err ){
       deferred.reject( err );
    }).done();

    return deferred.promise;
};// /readFile()


var uglifyOneFile = function( cPath, oOptions ) {
    var deferred = Q.defer();

    var oResult = uglifyJs.minify( cPath, oOptions );

    write( cPath, oResult.code )
    .done(function(){
        delete oResult.code;
        deferred.resolve({ 
            path: cPath,
            outcome: oResult 
        });
    });

    return deferred.promise;

};// /uglifyOneFile()