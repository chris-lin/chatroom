var everyauth = require('everyauth');
var mongoose = require( 'mongoose' );
var User     = mongoose.model( 'User');
var Message    = mongoose.model( 'Message');

module.exports = function(app) {
  var io = require('socket.io').listen(app);
  io.configure(function(){
    io.set('log level', 2)
  });
  
    // Messages buffer
    var buffer = [];
    var users = [];
    //Inert ingo MongoDB
    var pushBuffer = function(data) {
    new Message(data).save({},);
            //Message(data).update({date:data.Date_info},{$push :{msg:data.msg}})
            /*User.update({$push:{msg:data}},function(err){
                if(err){
                    console.log(err);
                    }
                else{
                    console("update success");
                    }
                });//*/
      //  console.log(data);
    buffer.push(data);
    
    if (buffer.length > 50) {
      buffer.unshift();
    }//*/
  }
  
  // Count how many sockets are connected
  var getUsersCount = function(data) {
    
    //~ var sockets = io.sockets.sockets;
    //~ 
    //~ var usersCount = 0;
    //~ 
    //~ for (var key in sockets) {
      //~ if (sockets.hasOwnProperty(key)) {
        //~ usersCount++;
      //~ }
    //~ }
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
          
          if (oldUsername && oldUsername.length > 0) {
            var msg = oldUsername + " has just renamed to " + username;
          } else {
            var msg = username + " 進來晟鑫聊天室.";
          }
          
          addUsers(username)
          
          var data = {
            msg: msg
            , username: '系統'
            , time: new Date()
            , system: true
            , onlineUsers: getUsersCount()
          };
          // Emit system message that user joins the chat
          io.sockets.emit('system', data);
          io.sockets.emit('users', users);
          //console.log(data);
          // Emit messages in buffer
          for (i in buffer) {
            if (buffer[i].system) socket.emit('system', buffer[i]);
            else socket.emit('msg', buffer[i]);
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
          , username: '系統'
          , time: new Date()
          , system: true
          , onlineUsers: getUsersCount()
        };
        
        // Emit system message that user leaves the chat
        socket.broadcast.emit('system', data);
        socket.broadcast.emit('users', users);
        
        //pushBuffer(data);
        
      })
      
    });
    
    // When user gets message
    socket.on('msg', function(msg){
            
      // Add in check if message isn't empty
      if (msg && msg.length < 1) return false;      
         console.log(msg);
      //console.log("users = "+users)
      
      // Get username first
    socket.get('username', function(err, username) {
        console.log("username username = "+username);  
        User.find({"id":username.trim()}).run( function (err, docs) {
           // console.log(docs);
            now = new Date();
            date=now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
            time=now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            var data = {
                        username: username
                        , time: new Date()
                        , msg: msg
                        }
                // Broadcast the data
            socket.broadcast.emit('msg', data);
            pushBuffer(data);
            });//*/  
        });
      
    });

  });
  
  
  
  return io;
  
}
