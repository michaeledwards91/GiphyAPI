var animalsArray = ["Dog", "Cat", "Penguin", "Dinosaur", "Jellyfish", "Worm"];

var apiKey = "&api_key=dc6zaTOxFJmzC";
var queryURL = "http://api.giphy.com/v1/gifs/search?q=";



function renderButtons(){ 
	$(".giphyButtons").html("");
	// YOUR CODE GOES HERE
	for (var i = 0; i < animalsArray.length; i++) {
		var newButton = $("<button>");
		newButton.html(animalsArray[i]);
		newButton.attr("class", "animalButton");
		newButton.addClass("btn");
		newButton.addClass("btn-primary");
		newButton.attr("data-name", animalsArray[i]);
		$(".giphyButtons").append(newButton);
	}
}

$(document).ready(function () {
	console.log("this is running");
	renderButtons();

	$("#addAnimal").on("click", function (event) {
		event.preventDefault();
		var newAnimal = $("#animal-input").val();
		animalsArray.push(newAnimal);
		renderButtons();
		$("#animal-input").val("");
	})

	// $(".animalButton").on("click", function() {
	// 	$.ajax({
	// 		url: queryURL + this.dataset.name + "&limit=10" + apiKey,
	// 		method: "GET"
	// 	}).done(function(response) {
	// 		console.log(response);
	// 		$(".gifs").html(""); //empty previous gifs before populating
	// 		for (var i = 0; i < response.data.length; i++) {
	// 			console.log(response.data[i]);
	// 			$(".gifs").append("Rating: " + response.data[i].rating);
	// 			var imageURL = response.data[i].images.fixed_height.url;
	// 			$(".gifs").append("<img src="+imageURL+">");
	// 		}
	// 	})
	// })
	
	$(document).on("click", ".animalButton", function() {
		$.ajax({
			url: queryURL + this.dataset.name + "&limit=10" + apiKey,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			$(".gifs").html(""); //empty previous gifs before populating
			for (var i = 0; i < response.data.length; i++) {
				console.log(response.data[i]);
				$(".gifs").append("Rating: " + response.data[i].rating);
				//load images as stills
				var newImg = $("<img>");
				newImg.attr("class", "still");
				var stillURL = response.data[i].images.fixed_height_still.url;
				var gifURL = response.data[i].images.fixed_height.url;
				newImg.attr("data-stillLink", stillURL);
				newImg.attr("data-gifLink", gifURL);
				newImg.attr("src", stillURL);
				$(".gifs").append(newImg);
			}
		})
	})
	//make the still images animate on click
	$(document).on("click", ".still", function () {
		console.log(this.getAttribute("data-gifLink"));
		$(this).attr("src", this.getAttribute("data-gifLink"));
		$(this).attr("class", "animated");
	})
	//make the animated images still on click
	$(document).on("click", ".animated", function() {
		$(this).attr("src", this.getAttribute("data-stillLink"));
		$(this).attr("class", "still");
	})

})
