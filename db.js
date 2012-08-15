var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});

var Groups = new Schema({
    id : String,
    groupsname : String
    });

var Message = new Schema({
            time : Date,
            info : String,
            user_id: String
            });

var User = new Schema({
    id    : { type : String, unique : true },
    name  : String,
    profile    : String,
    password   : String
});

mongoose.model( 'Todo', Todo );
mongoose.model( 'User', User );
mongoose.model( 'Groups', Groups );
mongoose.model( 'Message', Message );

mongoose.connect( 'mongodb://localhost/ossii-chat' );
