// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");
mongoose.Promise = Promise;


// Initialize express
var app = express();

// use morgan an body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: false
}));

// Make the public file a static dir
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/healthNews_db");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error){
	console.log("Mongoose Error: ", error);
});

// Once logged into the db through mongoose, log a succes message
db.once("open", function(){
	console.log("Mongoose connection successful.");
});

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/articles-api-routes.js")(app);

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});

