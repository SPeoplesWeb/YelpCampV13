var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
//Setup User Model
var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

//Gives all methods important functionality to our user model
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);