require('dotenv').config();
var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require('mongoose'),
	methodOverride = require("method-override"),
	passport	= require('passport'),
	LocalStrategy = require('passport-local'),
	Campground  = require("./models/campground"),
	flash		= require('connect-flash'),
	Comment		= require("./models/comment"),
	User		= require("./models/user"),
	seedDB		= require("./seeds");

//Requiring Routes
var commentRoutes 	 = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	authRoutes	 	 =require("./routes/auth");

//Define port
var port = process.env.PORT || process.env.IP || 3000;
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v12";
//Define DB
var pw = process.env.MONGO_PASSWORD;
var user = process.env.MONGO_USER;

console.log(process.env.DATABASEURL);
//DEV DB
// mongoose.connect(url,
// 	{
// 	useNewUrlParser: true,
// 	useCreateIndex: true
// 	}).then(() =>{
// 		console.log("");
// }).catch(err => {
// 	console.log("ERROR:", err.message);	
// });

//PROD DB
 mongoose.connect("mongodb+srv://"+ process.env.MONGO_USER + ":"+ process.env.MONGO_PASSWORD+"@cluster0-8zmiz.mongodb.net/test?retryWrites=true", 
 	{
 	useNewUrlParser: true,
 	useCreateIndex: true
 	}).then(() =>{
 		console.log("");
 }).catch(err => {
 	console.log("ERROR:", err.message);
 });

mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
//Will allow us to view EJS files without declaring .ejs when rendering files.
app.set("view engine", "ejs");
//CSS Style Sheet
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// Seed the Database
//seedDB();
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "I am cool",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//Give it the name of our routes that we require
app.use(authRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
//We can shorten the routes in the campgrounds.js file by adding the common filepath here.
app.use("/campgrounds", campgroundRoutes);
//Fire up the Server
app.listen(port, function() {
	console.log("Running the Yelp Camp Server");
});
// app.listen(3000, function(){
// 	console.log("Running the Yelp Camp Server");
// });