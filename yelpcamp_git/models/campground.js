var mongoose=require("mongoose");
var campgroundSchema=new mongoose.Schema({
	name:String,
	image:String,
	discription:String,
	author:{
		id: {
		type:mongoose.Schema.Types.ObjectId,
		ref:"user"
	},
		username:String
	},
	comments:[
		{
		type:mongoose.Schema.Types.ObjectId,
		ref:"comment"	
		}
	]
});

var campground=mongoose.model("campground",campgroundSchema);
module.exports=campground;
