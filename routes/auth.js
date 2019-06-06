var express = require("express");
var router	= express.Router();
var passport = require("passport");
var User 	= require("../models/user");

//Root Route
router.get("/", function(req, res){
	res.render("landing");
});

//================
//AUTH ROUTES
//================
//ROUTE: Register Form
router.get("/register", function(req, res){
	res.render("register", {page: 'register'});
});

//Handle sign up logic
router.post("/register", function(req,res){
	//res.send("Signing you up..");
	var newUser = User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register", {error: err.message});
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp: " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//SHOW LOGIN FORM
router.get("/login", function(req, res){
	res.render("login", {page: 'login'});
});

//Handling login logic
router.post("/login", function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/campgrounds",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome to YelpCamp, " + req.body.username + "!"
    })(req, res);
});

//Add logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You have logged out");
	res.redirect("/campgrounds");
});

module.exports =  router;