// Scrape articles with SCRAPE NEW ARTICLES button
$("#scrapeNewArticles").on("click", function(){
	// Make ajax call for the /scrape route
	$.ajax({
		method: "GET",
		url: "/scrape"
	})
	.done(function(data) {
		console.log("scraped");
	});
});

// Save article and send data to the /save route
$("#saveArticleButton").on("click", function() {

	$.ajax({
		method: "PUT",
		url: "/save",
		data: {
			id: $(this).attr("data")
		}
	})
	.done(function(data) {
		console.log(data);
	});
});

// Delete article from saved and send data to the /deleteFromSaved route
$("#deleteFromSaved").on("click", function() {

	$.ajax({
		method: "PUT",
		url: "/deleteFromSaved",
		data: {
			id: $(this).attr("data")
		}
	})
	.done(function(data) {
		console.log(data);
	});
});

$("#commentSubmit").on("click", function() {

	var articleId = $("#articleId").val();

	$.ajax({
		method: "POST",
		url: "/articles/"+articleId,
		data: {
			body: $("#commentBody").val()
		}
	})
	.done(function(data) {
		$("#commentBody").empty();
		console.log(data);

	});
});




