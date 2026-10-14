

var buttonNames = ["Manchester United", "Barcelona FC", "Bayern Munich", "Chelsea FC", "Atletico Madrid", "Real Madrid", "Juventus", 
"Liverpool", "Arsenal", "PSG", "Manchester City", "Inter Milan", "AC Milan"];

// The Giphy API key is no longer stored in the repo. Each visitor enters their own
// key (free at https://developers.giphy.com), and it is kept in their browser only.
var KEY_STORAGE = "giphyApiKey";
var apiKey = "";
try { apiKey = localStorage.getItem(KEY_STORAGE) || ""; } catch (e) {}

function showKeyForm() {
	$("#key-form").toggle(!apiKey);
}

$("#key-form").on("submit", function(event) {
	event.preventDefault();
	apiKey = $("#giphy-key").val().trim();
	try { localStorage.setItem(KEY_STORAGE, apiKey); } catch (e) {}
	$("#giphy-key").val("");
	showKeyForm();
});
var searchGif;

function createsButtons() {
	// clears buttons div for when new button is added
	$("#buttonsContainer").empty();

	for(var i = 0; i < buttonNames.length; i++) {
		
		// creates button tag
		var buttons = $("<button>");
		// add class to button 
		buttons.addClass("gifSearch btn btn-info");
		// add attribute to button
		buttons.attr("data-name", buttonNames[i]);
		// adds name to be displayed inside button
		buttons.text(buttonNames[i]);
		// adds button to where it's going to be displayed
		$("#buttonsContainer").append(buttons);
	}
}

$("#addClub").on("click", function(event) {

	event.preventDefault();

	var userInput = $("#club-input").val().trim();
	if (!userInput) return;

	buttonNames.push(userInput);
	$("#club-input").val("");

	createsButtons();
})

function generateGifs() {
	if (!apiKey) {
		showKeyForm();
		return;
	}
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + encodeURIComponent(searchGif) + "&api_key=" + encodeURIComponent(apiKey) + "&limit=10";
	 $.ajax({
      "url": queryURL,
      "method": "GET"
    }).then(function(response) {
      console.log(response);
      $("#soccer-clubs").empty();
      var results = response.data;
      console.log(results.length);
      for(var j = 0; j < results.length; j++) {
      	var stillGif = results[j].images.fixed_height_still.url;
      	console.log(stillGif);
      	var animateGif = results[j].images.fixed_height.url;
      	console.log(animateGif);
      	var rating = results[j].rating.toUpperCase();
      	console.log(rating);
      	var gifs = $("<div class=gifContainer>");
      	var gifImage = $("<img class='gif'>").attr({ src: stillGif, id: j });
      	gifImage.attr("data-state", "still");
      	gifImage.attr("data-still", stillGif);
      	gifImage.attr("data-animate", animateGif);
      	gifs.append(gifImage);
      	gifs.append($("<p>").text("Rating: " + rating));
      	$("#soccer-clubs").append(gifs);
      }

    });
}

$(document).on("click", ".gifSearch", function(event) {
	event.preventDefault();
	searchGif = $(this).text();
	console.log(searchGif);
	generateGifs();

});

$(document).on("click", ".gif", function(event) {
	event.preventDefault();
	var state = $(this).attr("data-state");
	console.log(state);

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
})



createsButtons();
showKeyForm();
