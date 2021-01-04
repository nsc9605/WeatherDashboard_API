

console.log("works")
 
// Set current time in header when application is opened
// $(document).ready(function () {
//     let today = moment();
   // $("#currentDate").text(today.format("dddd MMMM Do YYYY, h:mm a"));

// Global Variables
let apiKey = 'c6c3415f70d6fade0d7d3230231ef65e';
let currentDate = moment().format('MM/DD/YYYY');
// let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + apiKey;
var lat = '';
var lon = '';
var cityUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid={APIKey}`;
let currentCity = ("#currentCity");
let tempEl = ("#temp");
let humidityEl = ("#humidity");
let windEl = ("#wind");
let uvIndexEl = ("#uvIndex");
let cityNameEl = ("#cityName");
let weatherDescription = ("#weatherDescription");


// $(".search-form").on("submit", function() {
//     let city = $("#inputValue").val();
//     console.log(city);
// })


// Submit event
document.querySelector(".search-form").addEventListener("submit", function(event) {
   event.preventDefault();
   let cityInput = document.querySelector("#inputValue").value;
   console.log(cityInput);
   getWeather(cityInput);
   showWeather(data);
   // saveLocalWeather(cityInput);
})

// API call to get lat and lon coordinates
function getWeather(cityName) {
   console.log(cityName);
   let queryURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=${apiKey}`;
   
       fetch(queryURL) 
       .then(function(weatherResponse) {
           weather = weatherResponse;
      
           return weatherResponse.json();
       })
       .then(function(data) {
           console.log(data);
          
           var showWeather = getWeather(data);
           $("#currentWeather").html(showWeather);
           

           // function showWeather(data) {
           //     return $("<h5>Current City: " + data.cityName + "</h5>");
       
           //     }
           // let lat = data.coord.lat;
           // let lon = data.coord.lon;
       })
       .catch(error => console.log(error))

     
   var currentWeatherInfo = $("<div>");
   currentWeatherInfo.addClass("weather");
   $(".currentWeather").append(currentWeatherInfo);


   // var C = false;
   // var apiData;

   // function displayTemp (F, C){
   //     if (C) return Math.round((F - 32) * (5/9)) + '&deg; C';
   //     return Math.round(F) + '&deg; F';
   // }


   // Function render


   // Function saveLocalWeather

}

// })
function showWeather(data) {
   var cityName = data.name;
   var weather = data.weather[0].description;
   var temp = data.main.temp;
   var minTemp = data.main.temp_min;
   var maxTemp = data.main.temp_max;

   document.querySelector('.cityName').innerHTML = `<h5> ${cityName} </h5>`;
   document.querySelector('.temp').innerHTML = `<p>Current Temp: ${temp}</p>`;
   document.querySelector('.weatherDescription').innerHTML = `<p>${weather}</p>`;
   document.querySelector('#minTemp').innerHTML = `<p>Min Temp: ${minTemp}</p>`;
   document.querySelector('#maxTemp').innerHTML = `<p>Max Temp: ${maxTemp}</p>`;
}

