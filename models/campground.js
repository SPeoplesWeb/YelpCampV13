var mongoose = require('mongoose');
var Comment = require("./comment");

//SCHEMA SETUP - Mongoose
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	price: String,
	description: String,
	location: String,
	lat: Number,
	lng: Number,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

//To delete comments from the database when a campground is deleted.
campgroundSchema.pre('remove', async function(){
	await Comment.remove({
		_id:{
			$in: this.comments
		}
	});
});


//Compile into a model from SCHEMA SETUP - Mongoose
//export the module to the app.js file
module.exports = mongoose.model("Campground", campgroundSchema);