var express=require("express");
var router=express.Router();
var passport =require("passport");
var user=require("../models/user");
//////////////////////////////////////////////////////////////////////////////////////////
//=======================================================================
///////auth routes

///////////////////////////////////////////////////////////
router.get("/",function(req,res){
	res.render("landingpage");
});




router.get("/register",function(req,res){
	res.render("register");
})
/////sign up submiit
router.post("/register",function(req,res){
	var newuser=new user({username:req.body.username});
	user.register(newuser,req.body.password,function(err,user){
		if(err){
			 req.flash("error",err.message);
			return res.redirect("back");
		}
		passport.authenticate("local")(req,res,function(){
			 req.flash("success","Welcome to yelp camp" +user.username);
			res.redirect("/campground");
		})
	})
});
///////////////////////////////////////////////////////////show login form
router.get("/login",function(req,res)
{
	res.render("login");
});
router.post("/login",passport.authenticate("local",{
	successRedirect:"/campground",
	failureRedirect:"/login"}),
	function(req,res){})

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged you out!");
	res.redirect("/campground");
});



function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports=router;