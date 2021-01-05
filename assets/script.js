console.log("works");

// Global Variables
let apiKey = "c6c3415f70d6fade0d7d3230231ef65e";
let currentDate = moment().format("MM/DD/YYYY");
let lat = "";
let lon = "";
let currentCity = "#currentCity";
let tempEl = "#temp";
let humidityEl = "#humidity";
let windEl = "#wind";
let uvIndexEl = "#uvIndex";
let cityNameEl = "#cityName";
let weatherDescription = "#weatherDescription";


// Submit event
document
  .querySelector(".search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let cityInput = document.querySelector("#inputValue").value;
    console.log(cityInput);
    getWeather(cityInput);
  });

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

// Show data on page
function showWeatherForToday(cityName, data) {
 
  document.querySelector("#currentDate").innerHTML = moment().format("MMMM Do, YYYY, hh:mm");
  document.querySelector("#weatherDescription").innerHTML = data.weather[0].description;
  document.querySelector("#currentIcon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"`;
  // document.querySelector("#cityImage").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.querySelector("#currentCity").innerHTML = cityName;
  document.querySelector("#temp").innerHTML = data.main.temp + "°F";
  document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
  document.querySelector("#wind").innerHTML = data.wind.speed + "mph";
  // document.querySelector("#uvIndex").innerHTML = data.main.uvi;
 }

// five day
function showFiveDayWeather(data) {

  // For loop to pull weather for 5 day forecast
  for (var i = 0; i < 5; i++) {
    // Set time/date for 5 day forecast
    let forecastDates = moment().add(i + 1, 'days').format("MMMM Do, YYYY, hh:mm");
  // Build HTML from js for 5-day forecast 
    let day = document.createElement("div");
    day.innerHTML = [
      `<h5>Date: ${forecastDates}</h5>`,
      `<img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">`,
      `<p>${data.daily[i].weather[0].description}</p>`,
      `<p></p>`,
      `<p>Temperature: ${data.daily[i].temp.day}°F</p>`,
      `<p>Humidity: ${data.daily[i].humidity}%</p>`,
      `<p>Wind Speed: ${data.daily[i].wind_speed}</p>`,
      `<p>UV Index: ${data.daily[i].uvi}</p>`,
    ];
    document.querySelector("#fiveDayContainers").appendChild(day);
  }
}



// Pull current UVI from second api data to get current uvI

  // let uvi = data.current.uvi;
  // document.querySelector("#uvIndex").innerHTML = uvi;
  // document.querySelector("#currentWeather").append(uvi);
