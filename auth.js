var everyauth = require('everyauth');
var mongoose = require( 'mongoose' );
var chat_user = mongoose.model( 'chat_user' );

everyauth.everymodule.findUserById( function (userId, callback) {
    chat_user.
      findOne({ id : userId }).
      run( callback );
});

everyauth.password
    .getLoginPath('/') // Login page url
    .postLoginPath('/') // Url that your login form POSTs to
    .loginView('index')
    .authenticate( function (login, password) {
        var promise = this.Promise();
        chat_user.
            findOne({ id : login , pwd : password }).
            run( function ( err, user ){
                if ( !user ) {
                    err = 'Invalid login';
                }
                if( err ) return promise.fulfill( [ err ] );
                promise.fulfill( user );
            });
        return promise;
    })
    .loginSuccessRedirect('/') // Where to redirect to after login
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
        new chat_user({
            id : newUser.login,
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
    if ( req.user.id != 'admin' ) {
        res.redirect( '/' );
        return;
    }
    next();
};
