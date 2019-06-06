# Yelp Camp V1
# Part 1
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

- each Campground has:
* Name
* Image

# Part 2
# Layout and Basic Styling

* Create our header and footer partials
* Add in Bootstrap (3 or 4)

# Part 3
# Creating New Campgrounds
* Setup new campground POST route
* Add in bodyParser
* Setup route to show form
* Add basic unstyled form

# Part 5
# Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form.
 
# Part 6
# Intro To MongoDB
* What is Mongo?
- NoSQL DB. looks like JS, key:value pairs. Dynamic.
- MEAN - MONGO<EXPRESS<ANGULAR<NODE

# Part 7
# Installing Mongo
* sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
* echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
* sudo apt-get update
* sudo apt-get install -y mongodb-org
* mkdir data
* echo 'mongod --dbpath=data --nojournal' > mongod
* chmod a+x mongod

============To Open Mongo=========
1. Run in terminal -> ./mongod
2. Open new terminal. Type -> mongod
3. To exit -> exit
4. Shut down Mongo Server -> Ctrl + C

# First Mongo Commands
* mongod - starts mongo demon process. Will run in the background for the rest of the course
* mongo - open the mongo server
* help - helpful tips in mongo
* show dbs - show DBs in mongo
* use - 
* insert - Add an item into a db or collection
* find - will find all objects within a collection, or a specific object.
* update - {$set: {name: "x", isCool: true"}} will stop the update from overriding the entire object in the collection
* remove

# Mongoose
* What is Mongoose?
- Object Data Mapper - Mongo DB object modelling for Node.JS
 Helps us interact with MongoDB inside out JS files.

* Why are we using it?

* Interact with a MongoDB using Mongoose

# How to Avoide Potential Issues with Mongoose
* If you come into a deprecated error for Mongoose - Use this in your code: mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
======================================
# Part 8
# Add Mongoose to YelpCamp value
* Install and configure mongoose
* Setup campground Model
* Use campground model inside of our routes

# Part 9
# Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

* RESTFUL ROUTES 
name	url	 		verb	Desc.
=========================

INDEX	/dogs 		GET 	Display a list of all dogs
NEW		/dogs/new	GET		Display form to make a new dogs
CREATE	/dogs		POST	Add new dog to DB
SHOW	/dogs/:id 	GET		Shows info about one dog

# ========================== YELP CAMP V3

# REFACTOR MONGOOSE CODE
* Create a models directory
* Use module.exports
* Require() everything correctly!

# Add Seeds File
* Add a seeds.js file 
* Run the seeds file every time the server 

=====V4======
# Add the Comment models
* Make our errors go away!
* Display comments on campground show page

# Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

=====V5======



=====V6 AUTH======
* Add User Model
* Install all packages needed for auth
* Define User Model

# Register
* Configure Passport
* Add register Routes
* Add register template

# Login
* Add login routes
* Add login template


# Logout/Navbar
* Add logout routes
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

# Auth Part 5 / Show/Hide Links
* Show/Hide auth links in Navbar Correctly

=======V7========
# Refactor The Routes
* Use Express router to reorganize all routes

# =====V8====
# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically.

# =====V9====
# Users + Campgrounds
* Prevent an unauthenticated user from creating a campgrounds* Save username+id to newly created campgrounds

# ====V10====
# Editing Campgrounds
* Add Method-Override
* Add Edit Routes for Campgrounds
* Add link to edit Page
* Add Update Routes
* Fix $set problem

# Deleting Campgrounds
* Add Destroy Routes
* Add Delete button

# Authorization
* User can only edit their campgrounds
* User can only delete their own campgrounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add edit route for comments
* Add Edit button
* Add Update Routes

# Deleting Comments
* Add Destroy Routes
* Add Delete Button

# Authorization Part 2: Comments
* User can only edit their own comments
* User can only delete their own comments* Hide/Show edit and delete buttons
* Refactor Middleware

# Adding in Flash
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header*

# V13 
* Refactored code to improve UI.
 - Login and Sign Up 
 - Nav Bar responsive to Mobile and tablet
 - Registration Flash Message