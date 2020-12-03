
let apiKey = "ec69048cb2b0cadd73309ba3b0504619";
let searchBtn = $(".searchBtn");
let searchInput = $(".searchInput");
let cityStateEl = $(".city");
let currentDateEl = $(".currentDate");

// Set current time in header when application is opened
$(document).ready(function () {
    let today = moment();
    $("#currentDate").text(today.format("dddd MMMM Do YYYY, h:mm a"));


    let queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={APIkey}';

    
$.ajax({
url: queryURL,
method: "GET",
})
.then(function(data){
    let lat = JSON.stringify(data.lat);
    let lon = JSON.stringify(data.lon);
    let queryURL2 = ''
})
})
