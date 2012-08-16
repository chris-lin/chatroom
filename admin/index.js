
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
exports.del_User = function ( req, res, next ){
    User.remove({"_id":res._id}).run(function(err){
        if(err){
            console.log("Delete "+data.id+" fail");
            }
        else{
            console.log("delete success!");
            }   
        });
};

exports.modify_User = function ( req, res, next ){
    User.updateupdate(res, next).run(function(err){
        if(err){
            console.log("modify "+data.id+" fail");
            }
        else{
            console.log("modify success!");
            }          
        });
};
