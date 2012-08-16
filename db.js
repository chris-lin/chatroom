var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});


var chat_user = new Schema({
    id    : { type : String, unique : true },
    pwd   : String
});

var Records = new Schema({
  talked_by: String,
  time : Date,
  msg : String
});



mongoose.model( 'Todo', Todo );
mongoose.model( 'chat_user', chat_user );
mongoose.model( 'Records', Records );


mongoose.connect( 'mongodb://localhost/ossii-chat' );
