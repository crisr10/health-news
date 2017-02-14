// Require models
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

module.exports = function(app) {
	app.get("/", function(req, res) {
	  res.render("index");
	});

	// A GET request to scrape Science Daily health news
	app.get("/scrape", function(req,res){
		// First we grab the body of the html with request
		request("https://www.sciencedaily.com/news/top/health/", function (error, response, html) {
			// Then we loan that into cheerio and save it to $ for a shorthand selector
			var $ = cheerio.load(html);
			// now we grab every h3 within an article tag, and do the following:
			$("h3.latest-head").each(function(i, element) {
				// save an empty result object
				var result = {};
				// add the text and href of every link, and save them as properties of the result object
				result.title = $(this).children("a").text();
				result.link = $(this).children("a").attr("href");

				// Using oure article model, crate a new entry
				// this effectively passes the result object to the entry (and the title and link)
				var entry = new Article(result);
				// Now insert that entry to the db
				entry.save(function(err, doc) {
					// log any errors
					if (err) {
						console.log(err);
					}
					else {
						console.log(doc);
					}
				});
			});
		});
		res.send("Scrape Complete");
	});

	// This will grab an article by it's ObjectId
	app.get("/articles/:id", function(req, res) {
		Article.find({_id: req.params.id})
		.populate("comments")
		.exec(function(error, doc) {
			if (error) {
				res.send(error);
			}
			else {
				res.send(doc);
			}
		});
	});
};






