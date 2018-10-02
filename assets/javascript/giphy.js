
var topics = ["beavis and butthead", "the simpsons", "south park", "family guy", "newsradio", 
"married with children", "conan obrien", "ace ventura", "anchorman"];

console.log(topics);
var searchOutcome;

window.onload = function() {
    //This is the function that will connect to Giphy and put the gifs onto the main page.
    function displayGifs(){
        
        var searchName = $(this).attr("data-name");
        if (searchName === undefined){
            searchName = searchOutcome;
        }
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName + "&api_key=o9z6nPwbSBqEc8anUEOyfBmAuaOxChYn&limit=10&offset=0";
        console.log(searchName);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $("gifbox").empty();
            var results = response.data;
            
            for (var i = 0; i < results.length; i++){
                var mainDiv = $("<div>");
                var gifMpaa = $("<p>").text("Rating: " + results[i].rating);
                
                
                var gifPic = $("<img>");
                var gifURL = results[i].images.fixed_height.url;
                gifPic.attr("src", gifURL);
                $("#gifbox").append(gifPic);

                mainDiv.append(gifPic);
                mainDiv.append(gifMpaa);

                $("#gifbox").prepend(mainDiv);
            }
        });
    }

  //In theory, this would turn the new search terms into buttons. That is, if I could have figured out
  //how to put the damned search box on the page.
    
    $("#addlaughs").on("click", function(event) {
        event.preventDefault();
        var newLaugh = $("#laughInput").val().trim();
        topics.push(newLaugh);
        console.log(topics);
        $("#laughInput").val('');
        displayButtons();
      });

  //This displays the buttons, oddly enough, this actually worked.
function displayButtons(){
    $("#buttonbox").empty();
    for (var i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
        
        gifButton.addClass("buttons btn-light");
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        
        $("#buttonbox").append(gifButton);
    }

}

displayButtons();
displayGifs();
//My attempts at getting the gifs to start and stop. Let's all have a good laugh at this one.
$(document).on("click", "action", displayGifs);
$(document).on("click", ".netflixGiphy", pauseAndPlay);
function pauseAndPlay(){
    var state = $(this).attr('data-state');
    if (state === 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $this.attr('data-state', 'still');    
    }
};






};

//The main thing that I couldn't get to was putting the search box on the page, then actually getting the search term
//put onto the page, and displaying the corresponding gifs. Just know, I tried, I really tried damnit.