var express = require("express");
var router	= express.Router();
var Campground = require("../models/campground");
var middleware = require('../middleware/');
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);
//By adding router.get instead of app.get, we no longer need to add them to the app itself, just the router. Add the require dependencies in the app.js file

//INDEX ROUTE - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res){
	//Render the campgrounds page with data from the campgrounds array
	
	//Need to get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds, page: 'campgrounds'});
		}
	});
});
	//var price = req.body.price;
	//var newCampground = {name: name,  image: image,price: price, description: desc, author: author};

//CREATE - Add NEW campground to Database
//Get data from the new.ejs FORM
//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newCampground = {name: name, image: image, price: price, description: desc, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
  });
});router.post("/", middleware.isLoggedIn, function(req, res){
	//Get Data from form and add to campgrounds array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name,  image: image,price: price, description: desc, author: author};
	//console.log(req.user);
	//Create a new campground and save to database.
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			//If this works, redirect to campgrounds page
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
});

//NEW - Show form to create new campground
//Route Request to shwo the New Campgrounds Form
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//SHOW - Shows more info about one campground 
router.get("/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground isn't there");
			res.redirect("back");
		}else{
			console.log(foundCampground);
			//Render SHOW template with that campground
			res.render("campgrounds/show", {campground:foundCampground});
		}
	});

});

//EDIT CAMPGROUND
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

//UPDATE CAMPGROUND - Form must submit here 
//Find and update the correct campground
// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});

module.exports =  router;
