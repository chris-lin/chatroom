/**
 * Module dependencies.
 */

var express = require('express')
//  , stylus = require('stylus')
  , nib = require('nib');

var app = module.exports = express.createServer();

var parseCookie = require('connect').utils.parseCookie,
    MemoryStore = require('connect/lib/middleware/session/memory');
//建立一个memory store的实例
var storeMemory = new MemoryStore({
    reapInterval: 60000 * 10
});

// mongoose setup
//require( './db' );

//admin setup
//var admin = require('./admin');

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret: 'OSSII Chat',
    store: storeMemory
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});


// Routes
var routes = require('./routes');

app.get('/', routes.index);
app.post('/login', routes.login);
app.get('/create', routes.create );
app.post('/create', routes.create );
app.get('/logout', routes.logout );
//app.get('/admin', auth.requireLogin, auth.requireAdmin, routes.admin );
//app.get('/admin/user', auth.requireLogin, auth.requireAdmin, routes.admin );
//app.get('/admin/user', routes.userManager );
//app.get('/del_user', admin.del_user );

app.listen(3000, function(){
  // Start SocketIO after app is initialized
  app.sockets = require('./socket')(app);

  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
