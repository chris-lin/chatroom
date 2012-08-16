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

var Records = new Schema({
            talked_by: String,
            time : Date,
            msg : String
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
mongoose.model( 'Records', Records );

mongoose.connect( 'mongodb://localhost/ossii-chat' );
