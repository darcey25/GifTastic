

var buttonNames = ["Manchester United", "Barcelona FC", "Bayern Munich", "Chelsea FC", "Atletico Madrid", "Real Madrid", "Juventus", 
"Liverpool", "Arsenal", "PSG", "Manchester City", "Inter Milan", "AC Milan"];

var apiKey = "YDdMBW7x2F4Dw9O0BB3nLAq2rf45KO9H";
var searchGif;
var queryURL = "http://api.giphy.com/v1/gifs/search?q="+searchGif+"&api_key="+apiKey+"&limit=10"

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

	buttonNames.push(userInput);
	$("#club-input").val("");

	createsButtons();
})

function generateGifs() {
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+searchGif+"&api_key="+apiKey+"&limit=10"
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
      	var gifImage = $("<img class='gif' src='"+stillGif+"' id="+[j]+"'>");
      	gifImage.attr("data-state", "still");
      	gifImage.attr("data-still", stillGif);
      	gifImage.attr("data-animate", animateGif);
      	gifs.append(gifImage);
      	gifs.append("<p>Rating: "+rating+"</p>");
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