var express=require("express");
var router=express.Router({mergeParams:true});
var campground =require("../models/campground");
var comment =require("../models/comment");
var middleware=require("../middlerware");
	
////comment new



router.get("/new",middleware.isLoggedIn,function(req,res){
	campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			
			res.render("comment/new",{campground : campground});
		}
	})
	
})
/////comment create
router.post("/",middleware.isLoggedIn,function(req,res){
	///look up campground id
   campground.findById(req.params.id,function(err,campground){
	   if(err){
		   console.log(err);
		   res.redirect("/campground")
	   }else{
		   comment.create(req.body.comment,function(err,comment){
			   if(err){
				   req.flash("error","something went wrong");
				   console.log(err)
			   }else{
				   ////add user name and id to comment
				   comment.author.id=req.user.id;
				   comment.author.username=req.user.username;
				   comment.save();
				   campground.comments.push(comment);
				   campground.save();
				    req.flash("success","successfully added comment");
				   res.redirect("/campground/" + campground._id);
				   
			   }
			
			   
		   })
	   }
   })

});
/////comments edit route
router.get("/:comment_id/edit",middleware.checkcommentownership,function(req,res){
	comment.findById(req.params.comment_id,function(err,foundcomment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comment/edit",{campground_id:req.params.id,comment:foundcomment});
		}
	})
	
	
});

/////comments update route
router.put("/:comment_id",middleware.checkcommentownership,function(req,res){
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
		if(err){
			res.redirect("back")
		}else{
			res.redirect("/campground/" +req.params.id)
		}
	})
});
////////comments destroy routes

router.delete("/:comment_id",middleware.checkcommentownership,function(req,res){
	////find by id and remove
	comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			 req.flash("success","comment deleted");
			res.redirect("/campground/" + req.params.id);
		}
	})
})



module.exports=router;