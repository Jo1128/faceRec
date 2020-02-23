var mongoose =require('mongoose');
var Schema = mongoose.Schema;


var logsSchema = new Schema({
	phonenumber: String,
    emailid:String,
    timestamp:String,
    payload:String,
    status:String

})
module.exports =  mongoose.model('userLog',userSchema);