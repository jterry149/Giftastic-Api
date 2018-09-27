// Global Variables
var topics = ["Mountain Biking","Camping",
              "Dogs","Cats","Fishing","Sunset",
              "Dreaming","RV","Football","Baseball"]; // Array of 10 starting topic buttons

// A function to display all the topic gif buttons inside the topicBtnDisplay div
var displayTopicBtns = function ()
{
    $("#topicBtnDisplay").empty();              // clearing the div to ensure no duplicate results
    // A for loop to create the buttons for the topics and assign class and id
    for (var i = 0; i < topics.length; i++)
    {
        var topicBtn = $("<button>");                      // create topicBtn to html element <button>
        topicBtn.addClass("topics");                       // add a class topics
        topicBtn.addClass("btn btn-primary btn-block");    // add a bootstrap class btn btn-primary
        topicBtn.attr("data-name", topics[i]);             // add am attribute data-name the name of the topics
        topicBtn.text(topics[i]);                          // put the text of the buttons the name in topics array
        $("#topicBtnDisplay").append(topicBtn);            // append those button to the topicBtnDisplay to show the user
    }
}
// A function to remove a topic from the topicBtn Display
var removeNewTopicBtn = function ()
{
    // Once the button is clicked it removes the last button added from the topicBtnDisplay Div
    $("#removeTopic").on("click", function()
    {
        topics.pop(topics);     // Use pop() to remove last element in the array of topics and so on
        displayTopicBtns();     // Call function displayTopicBtns to display current buttons
        return false;           // Return if nothing to remove from the buttons
    });
}
// A function to add a topic gif button inside the topicBtnDisplay Div
var addNewTopicBtn = function()
{
    // Once the button is clicked the topic is added to list of button in topicBtnDisplay Div
    $("#addTopic").on("click", function()
    {
        // Variable to store new topic
        var topic = $("#topic-input").val().trim();
        // Condition if topic input is blank user can't add the button
        if (topic == "")
        {
            alert("You must input a new topic to add button"); // Alert message to tell user to type a topic
            return false;   
        }
            topics.push(topic);              // Push the new topic to topics array  
            displayTopicBtns();              // Call the displayTopicBtns function
            $('input[type="text"]').val(''); // Clear the text input field
             
        return false;
    }); 
}

// A function to reset the screen to original 10 topics
var resetTopicBtn = function()
{
    // Once the button is clicked the original 10 topics are displayed on the screen in the topicBtnDisplay Div
    $("resetTopic").on("click", function()
    {
        displayTopicBtns();     // Call the buttons to be display the original 10 topics
    });
}

// A function to display the topic gifs when button specific button is pressed
var displayTopicGifs = function ()
{
    // Variables
    var topic = $(this).attr("data-name");      // get the data-name from the topic from topics array

    // The url and api key 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic +"&api_key=svYaesnli61hUnmOrtZNbTlftlsBzErW&limit=10"; 
    
    //console.log(queryURL);                      // displays the constructed url
    
    // The ajax call 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    
    // Once called get response of topic and display on page
    .done(function(response) 
    {
        console.log(response);                  // console test to make sure something returns from the response
        $("#topicsView").empty();               // erasing previous gifs are deleted in topicsView div
        var results = response.data;            // A variable that is assigned to the response.data
            // Condition if there no gifs to show for the topics
            if (results == "")
            {
                alert("There isn't a gif to be shown for this selected button");
            }
            
            // A for loop to loop through results and display in topicsView gif
            for (var i = 0; i < results.length; i++)
            {
                var topicsDiv = $("<div>");      // The div for the topics gif to go inside
                topicsDiv.addClass("topicsDiv"); // Add a class to the topicsDiv

                var topicRating = $("<p>").text("Rating: " + results[i].rating); // Pull the rating of the topic gif
                topicsDiv.append(topicRating);   // Append the rating to the topicDiv in a paragraph
                
                var topicImage = $("<img>");      // A variable to pull the image gif    
                topicImage.attr("src", results[i].images.fixed_height_small_still.url);     // image stored into src attr still
                topicImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                topicImage.attr("data-animate",results[i].images.fixed_height_small.url);     // animated image
                topicImage.attr("data-state", "still");   // set the image state
                topicImage.addClass("image");             // add a class image
                topicsDiv.append(topicImage);             // append image to topicsDiv of still image 
    
                $("#topicsView").prepend(topicsDiv);      // add topicsDiv images to topicsView on html page
            }
    });
}

//============= Giftastic-Api Load Page Area ====================//

// Call the Functions to display on page    
displayTopicBtns();     // calls the displayTopicBtn function to display buttons for topics
addNewTopicBtn();       // calls the addNewTopicBtn function to add a topic to the buttons
removeNewTopicBtn();    // calls the remove NewTopicBtn to remove the last topic added so when clicked

//==== Document Event handlers to handle the animations for a pause state, animate state ====//
$(document).on("click", ".topics", displayTopicGifs); // on click of topic call fucntion displayTopicsGif

// On click function
$(document).on("click", ".image", function()
{
    var state = $(this).attr('data-state');
    // Condition of images in still state to animate when clicked
    if ( state == 'still')
    {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }
    // other wise make image still when clicked
    else
    {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
