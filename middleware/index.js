var Campground = require("../models/campground");
var Comment		= require("../models/comment");
//Middleware Files.
var middlewareObj = {

};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	//Is user logged in
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground is not there");
			res.redirect("back");
		}else{
			//Does the user own the campground?			
			if(foundCampground.author.id.equals(req.user._id)){
				next();	
	 		}else{
				req.flash("error", "You don't have the proper permission to do this");
				res.send("You don't have permission");
			}
		}
	});
	}else{
		req.flash("error", "To complete this task, please login!");
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next){
	//Is user logged in
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err || !foundComment){
			req.flash("error", "Comment not found");
			res.redirect("back");
		}else{
			//Does the user own the comment?			
			if(foundComment.author.id.equals(req.user._id)){		
			}else{
				res.send("You don't have permission");
			}
			next();
		}
	});
	}else{
		req.flash("error", "You should log in first");
		res.redirect("back");	
	}
};

middlewareObj.isLoggedIn = function(req, res, next){
//isLoggedIn middleware func
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You can only do this when you are logged in");
	res.redirect("/login");
};


module.exports = middlewareObj;