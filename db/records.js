var records = require("mongeese").create();

var records_Schema   = records.Schema;

var chat_histories = new records.Schema({
  from : String,
  post_time : Date,
  msg : String
});

records.model( 'chat_histories', chat_histories );

records.connect('mongodb://localhost/Records');

exports.chat_histories = records;
