var everyauth = require('everyauth');
var mongoose = require( 'mongoose' );
var db = require('./db');
var chat_users     = db.chat_users.model( 'chat_users');
var chat_history    = db.chat_histories.model( 'chat_histories');

module.exports = function(app) {
  var io = require('socket.io').listen(app);

  io.configure(function(){
    io.set('log level', 2)
  });

  // Recordss buffer
  var buffer = [];
  var users = [];

  var broadcast = function(msg,username,time,io,option){
    var data = {
                    msg:msg
                    , from: username
                    , post_time: time
                    , system: option
                    , onlineUsers: getUsersCount()
                    }
                    io.sockets.emit('system', data);
      }
  //Inert ingo MongoDB
  var pushBuffer = function(data) {
    new chat_history(data).save();
  }

  // Count how many sockets are connected
  var getUsersCount = function(data) {
    var usersCount = users.length;
    return usersCount;
  }

  var addUsers = function(username) {
    var i;
    for(i=0;i<users.length;i++){
        if(users[i] == username){
            var check_op="repeat";
            return check_op;
            break;
            }
        }
    if(check_op != "repeat"){
        users.push(username);
        users.sort();
        }
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

                  if (oldUsername && oldUsername.length > 0) {
                      var msg = oldUsername + " has just renamed to " + username;
                  }
                  else {
                      var check_op;
                      addUsers(username);
                      var msg = username + " 進來晟鑫聊天室";
                      broadcast(msg,username,new Date(),io,"true");
                      io.sockets.emit('users', users);
                      chat_history.find().limit(10).sort('time', -1).run(function(err,docs){
                          for(i = docs.length-1; i>=0; i--){
                              broadcast(docs[i].msg,docs[i].from,docs[i].time,io,"true");
                              //~ var data = {
                                  //~ msg:docs[i].msg
                                  //~ , from: docs[i].from
                                  //~ , post_time: docs[i].time
                                  //~ , system: true
                                  //~ , onlineUsers: getUsersCount()
                              //~ };
                              //~ socket.emit('msg', data);
                          }
                          // Emit system Records that user joins the chat
                          //console.log(data);
                      });//*/
                  }

              });
          });
      });
      // When user leaves
      socket.on('disconnect', function(){
          socket.get('username', function(err, username) {
          if (!username) return false;

          removeUsers(username);
          msg = username + " 離開晟鑫聊天室.";
          broadcast(msg,users,new Date(),io,"true");
          io.sockets.emit('users', users);
        })

      });
      // When user gets Message
      socket.on('msg', function(msg){
          // Add in check if Records isn't empty
          if (msg && msg.length < 1) return false;
          // Get username first
          socket.get('username', function(err, username) {
          //console.log("username username = "+username);  
          chat_users.find({"id":username}).run( function (err, docs) {
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
