var animalsArray = ["Dog", "Cat", "Penguin"];

var apiKey = "&api_key=dc6zaTOxFJmzC";
var queryURL = "http://api.giphy.com/v1/gifs/search?q=";



function renderButtons(){ 
	$("#giphyButtons").html("");
	// YOUR CODE GOES HERE
	for (var i = 0; i < animalsArray.length; i++) {
		var newButton = $("<button>");
		newButton.html(animalsArray[i]);
		newButton.attr("class", "animalButton");
		newButton.attr("data-name", animalsArray[i]);
		$(".giphyButtons").append(newButton);
	}

	$(".animalButton").on("click", function() {
		$.ajax({
			url: queryURL + this.dataset.name + "&limit=10" + apiKey,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			$(".gifs").html(""); //empty previous gifs before populating
			for (var i = 0; i < response.data.length; i++) {
				console.log(response.data[i]);
				$(".gifs").append("Rating: " + response.data[i].rating);
				var imageURL = response.data[i].images.fixed_height.url;
				$(".gifs").append("<img src="+imageURL+">");
			}
		})
	})
}

renderButtons();