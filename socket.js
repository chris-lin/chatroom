
//------------------------------------------------------------------------------------------------------
var everyauth = require('everyauth');
var mongoose = require( 'mongoose' );
var db = require('./db');
var User     = db.chat_User.model( 'chat_User');
var Records    = db.Records.model( 'chat_History');


module.exports = function(app) {
  var io = require('socket.io').listen(app);

  io.configure(function(){
    io.set('log level', 2)
  });
  
  // Recordss buffer
  var buffer = [];
  var users = [];
  
  //Inert ingo MongoDB
  var pushBuffer = function(data) {
    new Records(data).save();
  }

  // Count how many sockets are connected
  var getUsersCount = function(data) {
    var usersCount = users.length;
    return usersCount;
  }

  var addUsers = function(username) {
    users.push(username);
    users.sort();
  }

  var removeUsers = function(username) {
    var key = users.indexOf(username);
    users.splice(key, 1);
  }

  io.sockets.on('connection', function(socket){
  
      // When user joins
      socket.on('join', function(username){
        
        // Try to get old username
          socket.get('username', function(err, oldUsername){
          
          // Set new username
              socket.set('username', username, function() {
                  addUsers(username)
                  if (oldUsername && oldUsername.length > 0) {
                      var msg = oldUsername + " has just renamed to " + username;
                  } 
                  else {
                      var msg = username + " 進來晟鑫聊天室";
                      
                      var data = {
                          msg:msg
                          , from: '系統'
                          , post_time: new Date()
                          , system: true
                          , onlineUsers: getUsersCount()
                          }
                      io.sockets.emit('system', data);
                      
                      Records.find().limit(10).sort('post_time', -1).run(function(err,docs){
                          for(i=0;i<docs.length;i++){
                              var data = {
                                  msg:docs[i].msg
                                  , from: docs[i].from
                                  , post_time: new Date()
                                  , system: true
                                  , onlineUsers: getUsersCount()
                              };
                              socket.emit('system', data);
                          }
                          
                          // Emit system Records that user joins the chat
                          io.sockets.emit('users', users);
                          io.sockets.emit('system', data);
                          //console.log(data);
                      });
                    
                      // Emit Recordss in buffer
                      for (i in buffer) {
                          if (buffer[i].system) socket.emit('system', buffer[i]);
                          else socket.emit('msg', buffer[i]);
                      }
                       
                  
                  }
              
              });
          });
      });
      // When user leaves
      socket.on('disconnect', function(){
          socket.get('username', function(err, username) {
          if (!username) return false;
          
          removeUsers(username);
          
          var data = {
            msg: username + " 離開晟鑫聊天室."
            , from: '系統'
            , post_time: new Date()
            , system: true
            , onlineUsers: getUsersCount()
          };
          
          // Emit system Records that user leaves the chat
          socket.broadcast.emit('system', data);
          socket.broadcast.emit('users', users);
          
          //pushBuffer(data);
          
        })
        
      });
      // When user gets Message
      socket.on('msg', function(msg){
          // Add in check if Records isn't empty
          if (msg && msg.length < 1) return false;      
          // Get username first
          socket.get('username', function(err, username) {
          //console.log("username username = "+username);  
          chat_user.find({"id":username}).run( function (err, docs) {
              // console.log(docs);

              var data = {
                          from: username
                          , post_time: new Date()
                          , msg: msg
                          }
              // Broadcast the data
              socket.broadcast.emit('msg', data);
              pushBuffer(data);
              });//*/  
          });
            

      });  
    
      return io;

  });

}
