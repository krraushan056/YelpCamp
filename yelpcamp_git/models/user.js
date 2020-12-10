var mongoose= require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");
var userschema=new mongoose.Schema({
	usernsme:String,
	password:String
})
userschema.plugin(passportlocalmongoose);
module.exports=mongoose.model("user",userschema)