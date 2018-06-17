$(document).ready(function(){
    var emotions = ["excited", "happy", "moody", "joyful", "facetious", "irate", "exhausted", "sad", "lonely", "thoughtful", "overzealous", "angry", "fearful", "surprise", "anxious"];

    function renderButtons() {
        $("#button-view").empty();
        for (var i = 0; i < emotions.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("btn");
            gifButton.attr("id", emotions[i]);
            gifButton.attr("data-name", emotions[i]);
            gifButton.text(emotions[i]);
            $("#button-view").append(gifButton);
        }
    }
    renderButtons();

    $("#submit").on("click", function(event) {
        event.preventDefault();
        var emotion = $("#search-input").val().trim();
        if (emotions.indexOf(emotion) == -1) {
            emotions.push(emotion);
            console.log(emotion);
            console.log(emotions);
        } else {
            alert("This emotion has already been added!")
        }
        renderButtons();
    })

    $("button").on("click", function displayGif() {

        $("#gif-view").empty();
    
        emotions = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotions + "&api_key=6kGYVECnM4aCkSCUTSAYJZNBP3DW9aiH&limit=9";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var response = response.data
            console.log(response);

            for (var i = 0; i < response.length ; i++) {
            
                var title = response[i].title;
                var rating = response[i].rating;                    var still = response[i].images.fixed_width_still.url;
                var animated = response[i].images.fixed_width.url;

                console.log(title);
                console.log(rating);
                console.log(still);
                

                var gifDiv = $("<div>").addClass("gif-div");
                var gifImage = $("<img>").addClass("d-block").attr("src", response[i].images.fixed_width_still.url);
                $(gifImage).attr("data-still", response[i].images.fixed_width_still.url);
                $(gifImage).attr("data-animate", response[i].images.fixed_width.url);
                $(gifImage).attr("data-current", "still")
                var gifText = $("<p>").addClass("rating").text("Rating: " + response[i].rating);
                gifDiv.append(gifImage);
                gifDiv.append(gifText);
                $(".col-md-8").append(gifDiv);
       
             }   
        })
    });

    $(document).on("click", ".d-block", function(){
        var currentData = $(this).data("current");
        if (currentData == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr($(this).data("current", "animate"));
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr($(this).data("current", "still"));
        }
    });
});