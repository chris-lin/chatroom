
/*
 * GET home page.
 */

var mongoose = require( 'mongoose' );
var utils    = require( 'connect' ).utils;
var everyauth= require( 'everyauth' );

exports.index = function ( req, res, next ){
    
  res.render( 'index', {
    title : 'OSSII chat Demo'
  });
};

exports.create = function ( req, res, next ){

    res.render( 'create', {
        title : 'OSSII Chat - Create',
    });
};

exports.admin = function ( req, res, next ){
    
    res.render( 'admin', {
        title : 'OSSII Chat - admin',
    });
};

