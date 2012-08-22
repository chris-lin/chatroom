
/*
 * GET home page.
 */

//var mongoose = require( 'mongoose' );
var utils    = require( 'connect' ).utils;
var everyauth= require( 'everyauth' );
var db = require('../db');
var chat_users = db.chat_users.model( 'chat_users');
/*
var users = mongoose.model( 'chat_User');
//*/

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
    
    res.redirect( '/admin/user' );
};
exports.userManager = function ( req, res, next ){

    users.find(function (err, data) {
      
        console.dir(data.length);
        console.dir(data);
        
        res.render( 'admin', {
            title : 'OSSII Chat - admin',
            page: 'userManager',
        people: data
        });
    });
    
};
