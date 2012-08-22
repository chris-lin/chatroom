var everyauth = require('everyauth');
var mongoose = require( 'mongoose' );
var db = require('./db');
var chat_user = db.chat_users.model( 'chat_users');

everyauth.everymodule.findUserById( function (userId, callback) {
    for (i in arguments) {
        console.dir( i + ' = ' + arguments[i]);
    }
    chat_user.
      findOne({ email : userId }).
      run( callback );
});

everyauth.password
    .getLoginPath('/') // Login page url
    .postLoginPath('/') // Url that your login form POSTs to
    .loginView('index')
    .authenticate( function (login, password) {
        var promise = this.Promise();
        chat_user.
            findOne({ email : login , pwd : password }).
            run( function ( err, user ){
                if ( !user ) {
                    err = 'Invalid login';
                }
                if( err ) return promise.fulfill( [ err ] );
                console.log('user = ' + user);
                promise.fulfill( user );
            });
        return promise;
    })
    .loginSuccessRedirect('/wtf') // Where to redirect to after login
    .getRegisterPath('/create') // Registration url
    .postRegisterPath('/create') // Url that your registration form POSTs to
    .registerView('create')
    .validateRegistration( function (newUser) {
        
        if (!newUser.login || !newUser.password) {
            return ['Either ID or Password is missing.'];
        }
        return null;
    })
    .registerUser( function (newUser) {
        var promise = this.Promise();
        console.log(newUser)
        new chat_user({
            email : newUser.login,
            pwd : newUser.password
        }).save( function ( err, user, count ){
          if( err ) return promise.fulfill( [ err ] );
          promise.fulfill( user );
        });
        return promise;
    })
  .registerSuccessRedirect('/') // Url to redirect to after a successful registration
  .loginLocals( {title: 'OSSII chat'})
  .registerLocals( {title: 'Login'});

var everyauth = require('everyauth')
  , connect = require('connect');

module.exports.requireLogin = function( req, res, next ) {
    console.log("myReq = " + req);
    if (!req.loggedIn) {
        res.redirect( '/' );
        return;
    }
    next();
};
module.exports.requireAdmin = function( req, res, next ) {
    if ( req.user.email != 'admin' ) {
        res.redirect( '/' );
        return;
    }
    next();
};
