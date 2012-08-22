/*
 * GET home page.
 */

var utils    = require( 'connect' ).utils;
var mongoose = require( 'mongoose' );
var db = require('../db');
var chat_user = db.chat_users.model( 'chat_users');

//  check email value exists on DB.
var findUserByEmail =  function (email, callback) {
    chat_user.
        findOne({ 'email' : email }).
        run( function ( err, user ){
            var isExists = false;
            if ( user ) {
                isExists = true;
            }
            callback( isExists );
        })
};

//  Main Page 
exports.index = function ( req, res, next ){
    params = { title : 'OSSII Chat' };
    
    //  use request.session.isLogin to check login
    if( req.session.isLogin && req.session.isLogin!==''){
            params.isLogin = true;
            params.user = req.session.user;
    }else{
        params.isLogin = false;
    }
    res.render( 'index', params );
};

//  User Login & set session.
exports.login = function ( req, res, next ){
    chat_user.
        findOne({ 'email': req.body.email, 'pwd': req.body.password }).
        run( function ( err, user ){
            if ( !user ) {
                //  login failure. redirect to index
                req.session.isLogin = false;
                res.redirect( '/' );
            };
            //setting login config to session
            req.session.isLogin = true;
            req.session.user = {
                'nickname': user.nickname,
                'email': user.email,
                'password': user.pwd 
            };
            res.redirect( '/' );
        });
};
exports.create = function ( req, res, next ){
    /* 
     * check post parmas empty. 
     * is empty then show register page
    */
    params = req.body;
    if ( !params.email || !params.password || !params.nickname ) {
        res.render( 'create', {
            title : 'OSSII Chat - Create',
        });
    }else{
        
        findUserByEmail( params.email, function( isExists ){
            if (isExists) {
                res.redirect( '/create' )
            } else {
                new chat_user({
                    email : params.email,
                    pwd : params.password,
                    nickname : params.nickname
                }).save( function ( err, user, count ){
                    if( err ) res.redirect( '/create' );
                    req.session.isLogin = true;
                    req.session.user = user;
                    res.redirect( '/' );
                });
            }
        })
    }
    
};

//  User Logout & clear session.
exports.logout = function ( req, res, next ){
    req.session.destroy();
    res.redirect( '/' );
}


/*
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
*/
