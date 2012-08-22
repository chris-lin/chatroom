var records = require("mongeese").create();
var users = require("mongeese").create();

var users_Schema   = users.Schema;
var records_Schema   = records.Schema;

var chat_users = new users_Schema({
    id    : { type : String, unique : true },
    pwd   : String
});

var chat_histories = new records.Schema({
  from: String,
  post_time : Date,
  msg : String
});

users.model( 'chat_users', chat_users );
records.model( 'chat_histories', chat_histories );
users.connect('mongodb://localhost/Users');
records.connect('mongodb://localhost/Records');

exports.chat_users = users;
exports.chat_histories = records;
