
let apiKey = "ec69048cb2b0cadd73309ba3b0504619";
let searchBtn = $(".searchBtn");
let searchInput = $(".searchInput");
let cityStateEl = $(".city");
let currentDateEl = $(".currentDate");

// Set current time in header when application is opened
$(document).ready(function () {
    let today = moment();
    $("#currentDate").text(today.format("dddd MMMM Do YYYY, h:mm a"));


    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=40.7128&lon=74.0060&exclude=part&appid=ec69048cb2b0cadd73309ba3b0504619";

    
$.ajax({
url: queryURL,
method: "GET",
})
.then(function(response){
    
})

