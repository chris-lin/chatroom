var mongoose = require( 'mongoose' );
var records = new mongoose.Mongoose();

//var records = require( 'mongoose' );
var Schema   = mongoose.Schema;


var Records = new Schema({
  from: String,
  time : Date,
  msg : String
});

records.model( 'Records', Records );

records.connect('mongodb://localhost/records');
//records.createConnection( 'localhost','records','5000' );
