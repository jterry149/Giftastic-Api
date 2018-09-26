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
        var topicBtn = $("<button>");           // create topicBtn to html element <button>
        topicBtn.addClass("topics");               // add a class topics
        topicBtn.addClass("btn btn-primary");   // add a bootstrap class btn btn-primary
        topicBtn.attr("data-name", topics[i]);  // add am attribute data-name the name of the topics
        topicBtn.text(topics[i]);               // put the text of the buttons the name in topics array
        $("#topicBtnDisplay").append(topicBtn); // append those button to the topicBtnDisplay to show the user
    }
}

// Call the Functions to display page    
displayTopicBtns();
