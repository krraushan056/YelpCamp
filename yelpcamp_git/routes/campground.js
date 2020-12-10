var express=require("express");
var router=express.Router();
var campground=require("../models/campground");
var middleware=require("../middlerware");

//get all campground from db


/////////////////////////////////////////////////////////////

router.get("/",function(req,res){
	

	//get all campgrounnd from db
	campground.find({},function(err,allnewcampground){
		if(err){
			console.log(err)
		}else
			res.render("campground/index",{campground:allnewcampground});
	})
	
	
});
//////CTREATE ROUTES
router.post("/",middleware.isLoggedIn,function(req,res){
		var name=req.body.name;
	var image=req.body.image;
	
	var desc=req.body.discription;
	var author={
		id: req.user._id,
		username:req.user.username
	}
	var newcampground={name:name,image:image,discription: desc,author:author}
	
	
	//campground.push(newcampground);
	//create a new campground and save to data base
	
	campground.create(newcampground,function(err,newlycreated){
		if(err){
			console.log(err)
		}else
			{
				res.redirect("/campground");
			}
	})
	
	
});

/////NEW ROUTES TO SHOW FORM
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campground/new");
})

router.get("/:id",function(req,res){
	//find the campground with provided provided
	campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundcampground);
			//render the show templetes with the campground
			res.render("campground/show",{campground:foundcampground});
		}
	});
	
});


///EDIT CAMPGROUNG ROUTES
router.get("/:id/edit",middleware.checkcampgroundownership,function(req,res){
	
	   	campground.findById(req.params.id,function(err,foundcampground){
			
				res.render("campground/edit",{campground:foundcampground});
			
	});
		});
	

	//otherwise redirect
	//if not,redirect
	////

	


/////////update
router.put("/:id",function(req,res){
	///find and update the current campground///
	////redirect somewhere

	campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcampground){
		if(err){
			res.redirect("/campground");
		}else{
			
			res.redirect("/campground/" + updatedcampground._id);
		}
	})
})
///////////////////////////destroy campground router

router.delete("/:id",middleware.checkcampgroundownership,function(req,res){
	campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campground");
		}else
			{
				res.redirect("/campground");
			}
	})
})




module.exports=router;