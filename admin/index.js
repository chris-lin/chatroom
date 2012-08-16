
/*
 * GET admin page.
 */

var mongoose = require( 'mongoose' );
var User     = mongoose.model( 'User' );

exports.index = function ( req, res, next ){

  res.render( 'index', {
    title : 'OSSII admin Demo',
    todos : []
  });
exports.create = function ( req, res, next ){
    User.remove({"_id":data._id}).run(function(err){
        if(err){
            console.log("Delete "+data.id+" fail");
            }
        else{
            console.log("success!");
            }   
        });
};

