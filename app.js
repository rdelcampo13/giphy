var reactions = ['happy', 'eye roll', 'high five', 'nope', 'kiss', 'lol', 'sad', 'sarcastic', 'savage', 'oh snap']

function renderButtons() {
  $("#bank").empty();
  for (var i = 0; i < reactions.length; i++) {
    button = $("<a class='btn btn-default reaction'>");
    button.text(reactions[i]);
    button.attr("data-reaction", reactions[i]);
    $("#bank").append(button);
  };
};

$("#submit").on("click", function(event) {

  if ($("#input").val() === "") {
    return;
  }

  event.preventDefault();
  var reaction = $("#input").val();
  reactions.push(reaction);
  $("#bank").empty();

  renderButtons();
});


$(document).on('click', '.reaction', function() {
  $("#gifs-appear-here").empty();
  var reaction = $(this).attr("data-reaction");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    reaction + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {

      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i++) {

        var reactionDiv = $("<div class='gif'>");

        var p = $("<p class='rating'>").text("Rating: " + results[i].rating);

        var reactionImage = $("<img class='img'>");
        reactionImage.attr("data-still", results[i].images.original_still.url);
        reactionImage.attr("data-animate", results[i].images.fixed_height.url);
        reactionImage.attr("data-state", "still");

        reactionImage.attr("src", results[i].images.original_still.url);

        reactionDiv.append(p);
        reactionDiv.append(reactionImage);

        $("#gifs-appear-here").prepend(reactionDiv);
      }
    });
});


$(document).on('click', '.img', function() {

  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});

renderButtons();

