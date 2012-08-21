/**
 * Module dependencies.
 */

var express = require('express')
//  , stylus = require('stylus')
  , nib = require('nib')
  , everyauth = require('everyauth');

var app = module.exports = express.createServer();

// mongoose setup
require( './db' );

// autoentication setup
var auth = require( './auth' );

// add everyauth view helpers to express
everyauth.helpExpress( app );

var routes = require('./routes');
//admin setup
var admin = require('./admin');
/*
// Stylus compile function
var compile = function (str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
};
*/

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: 'nodeTWParty'}) );
  app.use(everyauth.middleware() );
  app.use(app.router);
  // 必須要放在stylus下面 stylus才會有效
  app.use(express.static(__dirname + '/public'));
  /*
  // Insert Stylus middleware before creating static with Express
  app.use(stylus.middleware({
    src: __dirname + '/src/public'
    , dest: __dirname + '/public'
    , compile: compile
  }));
  */
});


// Routes

app.get('/', routes.index);
app.get('/create', routes.create );
app.get('/admin', auth.requireLogin, auth.requireAdmin, routes.admin );
//app.get('/admin/user', auth.requireLogin, auth.requireAdmin, routes.admin );
app.get('/admin/user', routes.userManager );
app.get('/del_user', admin.del_user );

/*
app.post( '/create', auth.requireLogin, routes.create );
app.get( '/destroy/:id', auth.requireLogin, routes.destroy );
app.get( '/edit/:id', auth.requireLogin, routes.edit );
app.post( '/update/:id', auth.requireLogin, routes.update );
*/

app.listen(3000, function(){

  // Start SocketIO after app is initialized
  app.sockets = require('./socket')(app);


  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
