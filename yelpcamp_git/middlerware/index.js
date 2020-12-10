var campground=require("../models/campground");
var comment=require("../models/comment");

/////all middkeware goes  here
var middlewareobj={};
middlewareobj.isLoggedIn=function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in to to that!!");
	res.redirect("/login");
}

middlewareobj.checkcampgroundownership=function checkcampgroundownership(req,res,next){
	if(req.isAuthenticated()){
	   	campground.findById(req.params.id,function(err,foundcampground){
		if(err){
			req.flash("error","campground not find");
			///doe the user own the campground  //foundcampground.author.id(its a object)//req.user._id(is a string)
			res.redirect("back");
			
		}else{
			
				if(foundcampground.author.id.equals(req.user._id)){
				next();
			}
			else{
				req.flah("error","You don't have permission to do that");
				res.redirect("back");
			}
	   }
	});
	}
		else{
			req.flash("error","You need to be logged in to do that!!!" )
	 	res.redirect("back");
	   }
	
};

	


middlewareobj.checkcommentownership=function checkcommentownership(req,res,next){
	if(req.isAuthenticated()){
	   	comment.findById(req.params.comment_id,function(err,foundcomment){
		if(err){
			///doe the user own the campground  //foundcampground.author.id(its a object)//req.user._id(is a string)	
			 
			res.redirect("back");
			
		}else{
			
				if(foundcomment.author.id.equals(req.user._id)){
				next();
			}
			else{
				 req.flash("error","you don't have permission to do that");
				res.redirect("back");
			}
	   }
	});
	}
		else{
			 req.flash("error","You need to be logged in to do that");
	 	res.redirect("back");
	   }
	
};




module.exports=middlewareobj;