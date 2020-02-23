var mongoose =require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
	phonenumber: String,
	username:String,
    emailid:String,
    password:String,
    twitterId: String

})
module.exports =  mongoose.model('user',userSchema);