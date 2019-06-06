var express = require("express");
//This will merge the routes together so we will be able to access routes correctly. 
var router	= express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment		= require("../models/comment");
var middleware = require('../middleware/');
// ====================
// COMMENTS ROUTES
// ====================

//ROUTE: Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
	//Find Campground By ID
	console.log(req.params.id);
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground: campground});
		}
	});
});

//ROUTE: Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
	//Lookup Campground Using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			//Premade object that we have everything we need to make a new comment.
			//Console.log(req.body.comment);
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong, please try again");
					console.log(err);
				}else{
					//Add username and ID to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//Save Comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash("success", "Successfully added your comment!");
				res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "No Campground found!");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id, function(err, foundComment){
      	if(err){
         	 res.redirect("back");
      	} else {
        	res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
     }
	});
   });
});

//Comments Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//Comments Delete/Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	//FindByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success", "Your comment has been deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports =  router;
