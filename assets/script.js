console.log("works");
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
// Save to localStorage
function saveToStorage(cityInput) {
  var inputDataSaved = JSON.parse(localStorage.getItem("searchCity")) || [];
  inputDataSaved.push(cityInput);
  localStorage.setItem("searchCity", JSON.stringify(inputDataSaved));
}
// Save localStorage to page 
function renderSaveBtns() {
  let inputDataSaved = JSON.parse(localStorage.getItem("searchCity")) || [];
  document.querySelector("#searchHistoryContainer").innerHTML = ""
  inputDataSaved.forEach(function (citySearches) {
    // console.log(citySearches)
    // document.querySelector("#searchHistoryBtn").innerHTML = citySearches;
    let searchHistoryBtn = document.createElement("button")
    searchHistoryBtn.classList.add("saved-city-button");
    searchHistoryBtn.innerHTML = citySearches;
    // console.log(searchHistoryBtn)
    document.querySelector("#searchHistoryContainer").appendChild(searchHistoryBtn);
    // $(".searchHistory").append(searchHistoryBtn);
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
    // console.log(cityInput);
    // console.log(newCitySearch);
    getWeather(cityInput);
    saveToStorage(cityInput);
    renderSaveBtns();
  });
// Click event for each saved city button - dynamic
var savedCityButtons = document.querySelectorAll('.saved-city-button')
savedCityButtons.forEach(function(eachButton){
	eachButton.addEventListener('click', function(e){
		var city = eachButton.innerHTML
		getWeather(city);
	})
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
      // console.log(data);
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
// renderSaveBtns();
// Show data on page
function showWeatherForToday(cityName, data) {
  document.querySelector("#currentDate").innerHTML = moment().format("MMMM Do, YYYY");
  document.querySelector("#weatherDescription").innerHTML = data.weather[0].description;
  document.querySelector("#currentIcon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>`;                                                    
  document.querySelector("#currentCity").innerHTML = cityName;
  document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°F";
  document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
  document.querySelector("#wind").innerHTML = Math.round(data.wind.speed) + "mph";
  $("#card-text").empty();
  $("#card-text").append(currentWeather);
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
  // let fiveDayRow = document.querySelector("#fiveDayRow");
  document.querySelector("#fiveDayContainers").innerHTML = ""
    for (var i = 0; i < 5; i++) {
    console.log("happens");
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
  }
}