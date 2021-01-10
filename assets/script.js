console.log("works");
// window.onload = function() {
// Global Variables
let apiKey = "c6c3415f70d6fade0d7d3230231ef65e";
// let currentDate = moment().format("MM/DD/YYYY");
let lat = "";
let lon = "";
let currentCity = "#currentCity";
let tempEl = "#temp";
let humidityEl = "#humidity";
let windEl = "#wind";
let uvIndexEl = "#uvIndex";
let cityNameEl = "#cityName";
let weatherDescription = "#weatherDescription";

// Save search history to localStorage
// function saveToStorage(newCitySearch) {
//   let inputDataSaved = JSON.parse(localStorage.getItem("searchCity")) || [];
//   inputDataSaved.push(newCitySearch);
//   localStorage.setItem("searchCity:", JSON.stringify(inputDataSaved));
// }
function saveToStorage(cityInput) {
  var inputDataSaved = JSON.parse(localStorage.getItem("searchCity")) || [];
  inputDataSaved.push(cityInput);
  localStorage.setItem("searchCity", JSON.stringify(inputDataSaved));
  getWeather(cityInput);
}

// Save localStorage to page 
function renderSaveBtns() {
  let inputDataSaved = JSON.parse(localStorage.getItem("searchCity")) || [];
  inputDataSaved.forEach(function (citySearches) {
    let searchHistoryBtn = $("<button>");
    searchHistoryBtn.addClass("btn btn-secondary searchHistoryBtn");
    searchHistoryBtn.text(citySearches);
    $("searchHistory").prepend(searchHistoryBtn);
    // console.log(searchHistoryBtn);
  })
}

renderSaveBtns();
// Submit event
document
  .querySelector(".search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let cityInput = document.querySelector("#inputValue").value;
    console.log(cityInput);
    // console.log(newCitySearch);
    getWeather(cityInput);
    // saveToStorage(newCitySearch);
    saveToStorage(cityInput);
    renderSaveBtns();

  });

$(".searchHistoryBtn").click(function () {
  var searchHistoryCity = $(this).text();
  getWeather(searchHistoryCity);
  renderSaveBtns();
})

// API call to get lat and lon coordinates
function getWeather(cityName) {
  console.log(cityName);
  let queryURLForToday = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=${apiKey}`;
  //   let queryURLForToday = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&q=${cityName}&appid=${apiKey}`;
  fetch(queryURLForToday)
    .then(function (weatherResponse) {
      return weatherResponse.json();
    })
    .then(function (data) {
      console.log(data);
      showWeatherForToday(cityName, data);

      // Call 5 day URL with lat lon from the one day response
      let queryURLForFiveDay = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;
      fetch(queryURLForFiveDay)
        .then(function (weatherResponse) {
          return weatherResponse.json();
        })
        .then(function (fiveDayData) {
          console.log(fiveDayData);
          showFiveDayWeather(fiveDayData);
        });
    });
}

renderSaveBtns();
// Show data on page
function showWeatherForToday(cityName, data) {
//  let currentDate = moment().format("MMMM Do, YYYY");
  // let currentDay = document.createElement("div");
  //   currentDay.innerHTML = [
  //     `<h4>${currentDate}</h4>
  //     <h5>City: ${cityName}</h5>span></h5>
  //     <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
  //     <p>${data.weather[0].description}</p>
  //     <p>Temperature: ${data.main[0].temp}°F</p>
  //     <p>High Temp: ${data.main[0].temp_max}°F</p>
  //     <p>Low Temp: ${data.main[0].temp_min}°F</p>
  //     <p>Humidity: ${data.main[0].humidity}%</p>
  //     <p>Wind Speed: ${data.wind[0].wind_speed}</p>
  //     <p>UV Index: ${data.current[0].uvi}</p>`,
  //   ];
  //   document.querySelector("#currentWeather").appendChild(currentDay);

  document.querySelector("#currentDate").innerHTML = moment().format("MMMM Do, YYYY");
  document.querySelector("#weatherDescription").innerHTML = data.weather[0].description;
  document.querySelector("#currentIcon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`;
  document.querySelector("#currentCity").innerHTML = cityName;
  document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°F";
  document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
  document.querySelector("#wind").innerHTML = Math.round(data.wind.speed) + "mph";

  // $("#card-text").empty();
  // $("#card-text").append(currentWeather);
  
 }

// five day
function showFiveDayWeather(data) {

  // Grabs UVI info from 5-day forecast API 
  // let currentIcon = document.querySelector("#currentIcon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"`
  let currentUVI = document.querySelector("#currentUVI").innerHTML = Math.round(data.current.uvi);
  document.querySelector("#currentWeather").append(currentUVI);
  
  // SET BADGES FOR UVI HIGH / LOW

      // if (currentUVI <= 2) {
        //   currentUVI.addClass("badge badge-success");
        //   } else if (currentUVI > 2 && currentUVI <= 5) {
        //     currentUVI.addClass("badge badge-warning");
        //   } else if (currentUVI > 5) {
        //     currentUVI.addClass("badge badge-danger");
        //   };
      // currentUVI.innerHTML = `UV Index: ${data.current.uvi}`;



  // For loop to pull weather for 5 day forecast
  for (var i = 0; i < 5; i++) {

    // Set time/date for 5 day forecast
    let forecastDates = moment().add(i + 1, 'days').format("ddd MM/DD/YYYY");

  // Build HTML from js for 5-day forecast 
    let day = document.createElement("div");
    day.innerHTML = [
      `<h5>${forecastDates}</h5>
      <img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" style="center">
      <p>${data.daily[i].weather[0].description}</p>
      <p>Temperature: ${Math.round(data.daily[i].temp.day)}°F</p>
      <p>High Temp: ${Math.round(data.daily[i].temp.max)}°F</p>
      <p>Low Temp: ${Math.round(data.daily[i].temp.min)}°F</p>
      <p>Humidity: ${data.daily[i].humidity}%</p>
      <p>Wind Speed: ${Math.round(data.daily[i].wind_speed)}</p>
      <p>UV Index: ${data.daily[i].uvi}</p>
      <br>`,
    ];
    document.querySelector("#fiveDayContainers").appendChild(day);

    renderSaveBtns();
  }
}

// };
