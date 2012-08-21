var records = require("mongeese").create();
var users = require("mongeese").create();

var users_Schema   = users.Schema;
var records_Schema   = records.Schema;

var chat_User = new users_Schema({
    id    : { type : String, unique : true },
    email   : String,
    pwd   : String
});

var chat_history = new  records.Schema({
  from: String,
  post_time : Date,
  msg : String
});

users.model( 'chat_User', chat_User );
records.model( 'chat_history', chat_history );
users.connect('mongodb://localhost/users');
records.connect('mongodb://localhost/Records');

exports.chat_User = users;
exports.Records = records;
