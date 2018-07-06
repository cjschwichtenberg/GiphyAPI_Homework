    // Inital array that become buttons immediately after document loaded
    var emotions = ["excited", "happy", "moody", "joyful", "facetious", "irate", "exhausted", "sad", "lonely", "thoughtful", "overzealous", "angry", "fearful", "surprise", "anxious"];

    
    // Function that creats initial array buttons
    function renderButtons() {
        $("#button-view").empty();
        for (var i = 0; i < emotions.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("btn");
            gifButton.attr("id", emotions[i]);
            gifButton.attr("data-name", emotions[i]);
            gifButton.text(emotions[i]);
            $("#button-view").append(gifButton);
        }
    }
    renderButtons();


    // On click event for submit button that creates additional button and adds new search criteria to array
    function addButtons() {
        $("#submit").on("click", function(event) {
            event.preventDefault();
            var emotion = $("#search-input").val().trim();
            if (emotions.indexOf(emotion) == -1) {
                emotions.push(emotion);
                renderButtons();
            } else if (emotion == "") {
                return false;
            } else {
                alert("This emotion has already been added!");
                return false;
            }
        })
    }   
    addButtons();

    // function that display's 10 gifs for initial buttons created
    function displayGifs() {
        
        var emotionGif = $(this).attr("data-name");

        // calling giphy API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotionGif + "&api_key=QLqUXM8T40xKH2hVB3S8QwCIypOjqn5H&limit=9";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            
            // emptying div where displayed gif will appear, pulling emotion being called from array
            $("#gif-view").empty();

            // Storing API response in variable
            var results = response.data;

            // for statement running through response data 9 times to display 9 gifs below
            for (var i = 0; i < results.length; i++) {    
                
                // checkpoint and log to make sure ajax is returning response info- not needed for deploy
                // var title = response[i].title;
                // var rating = response[i].rating;                    
                // var still = response[i].images.fixed_width_still.url;
                // var animated = response[i].images.fixed_width.url;
                // console.log(title);
                // console.log(rating);
                // console.log(still);
            
                // creating <div> with <img> and <p> elemets to display gifs, appending or prepending as necc. to div created in html index
                var gifDiv = $("<div>").addClass("gif-div");
                var gifImage = $("<img>").addClass("d-block").attr("src", results[i].images.fixed_width_still.url);
                $(gifImage).attr("data-still", results[i].images.fixed_width_still.url);
                $(gifImage).attr("data-animate", results[i].images.fixed_width.url);
                $(gifImage).attr("data-current", "still");
                var gifText = $("<p>").addClass("rating").text("Rating: " + results[i].rating);
                gifDiv.append(gifImage);
                gifDiv.append(gifText);
                $("#gif-view").append(gifDiv);
            }   
        });
    }   
    

    // On click event handler that displays Gifs when prompted by button click
    $(document).on("click", ":button", displayGifs);


    // on click event that plays/pauses individual gifs
    $(document).on("click", ".d-block", function(){
        var currentData = $(this).data("current");
        if (currentData == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-current", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-current", "still");
        }
    });
