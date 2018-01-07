// create new search buttons based on input from user
$(".submit").click(function(event) {
  event.preventDefault();
  // prevent empty button
  if ($("#searchTerm").val() != ""){
    // trim whitespace
    var animal = $.trim($("#searchTerm").val());
    var animalBtn = $("<button class='animal-btn m-1'>");
    animalBtn.text(animal);
    // handle multiple words in search term
    animal = animal.replace(" ", "+");
    animalBtn.attr('data-animal', animal);
    $("#btns-appear-here").append(animalBtn);
    // clear input box
    $("#searchTerm").val("");
  }
});

// using a delegated event handler because the dynamically added buttons
// don't have the click event bound to them.
$('#btns-appear-here').on('click', '.animal-btn', function(){
  // clear any previous gifs
  $('.item').remove();
  // build queryURL
  var URLprefix = "https://api.giphy.com/v1/gifs/search?q=";
  var animal = $(this).attr("data-animal");
  var URLpostfix =  "&api_key=ibnIqcKEQABVaS4GlYkw32oe06vsK7Sg&limit=10";
  var queryURL = URLprefix+animal+URLpostfix;

// get gifs based on queryURL
// using the abbreviated format for search query
// display still images first
  var xhr = $.get(queryURL);
  xhr.done(function(response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item float-left m-2'>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.attr("data-state", "still");
      animalImage.attr("class", "gif");
      gifDiv.prepend(p);
      gifDiv.prepend(animalImage);

      $("#gifs-appear-here").prepend(gifDiv);
    }
  });
});

//toggle the gif animation
//using another delegated event handler for the dynamically added images
$('#gifs-appear-here').on('click', '.gif', function(){
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
