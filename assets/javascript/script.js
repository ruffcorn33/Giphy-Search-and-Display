// create new search buttons based on input from user
$(".submit").click(function(event) {
  event.preventDefault();
  // prevent empty button
  if ($("#searchTerm").val() != ""){
    // trim whitespace
    var subject = $.trim($("#searchTerm").val());
    var gifBtn = $("<button class='gif-btn m-1'>");
    gifBtn.text(subject);
    // handle multiple words in search term
    // handle instances of multiple consecutive spaces within a search term
    // this regex is from https://stackoverflow.com/questions/1981349/regex-to-replace-multiple-spaces-with-a-single-space
    subject = subject.replace(/  +/g, ' ');
    // replace single interior space with a concat symbol
    subject = subject.replace(" ", "+");
    gifBtn.attr('data-subject', subject);
    $("#btns-appear-here").append(gifBtn);
    // clear input box
    $("#searchTerm").val("");
  }
});

// using a delegated event handler because the dynamically added buttons
// don't have the click event bound to them.  http://api.jquery.com/on/
$('#btns-appear-here').on('click', '.gif-btn', function(){
  // clear any previous gifs
  $('.item').remove();
  // build queryURL
  var URLprefix = "https://api.giphy.com/v1/gifs/search?q=";
  var subject = $(this).attr("data-subject");
  var URLpostfix =  "&api_key=ibnIqcKEQABVaS4GlYkw32oe06vsK7Sg&limit=10";
  var queryURL = URLprefix+subject+URLpostfix;

// get gifs based on queryURL
// using the abbreviated format for search query
// images initially display without animation
  var xhr = $.get(queryURL);
  xhr.done(function(response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item float-left m-2'>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var gifImage = $("<img>");
      gifImage.attr("src", results[i].images.fixed_height_still.url);
      gifImage.attr("data-animate", results[i].images.fixed_height.url);
      gifImage.attr("data-still", results[i].images.fixed_height_still.url);
      gifImage.attr("data-state", "still");
      gifImage.attr("class", "gif");
      gifDiv.prepend(p);
      gifDiv.prepend(gifImage);

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
