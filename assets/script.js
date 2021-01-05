console.log("works");

// Set current time in header when application is opened
// $(document).ready(function () {
//     let today = moment();
// $("#currentDate").text(today.format("dddd MMMM Do YYYY, h:mm a"));

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
      showWeatherForToday(data);

      // Call 5 day URL with lat lon from the one day response
      let queryURLForFiveDay = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;
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
function showWeatherForToday(data) {
  document.querySelector("#currentCity").innerHTML = data.name;
  document.querySelector("#temp").innerHTML = data.main.temp + "°F";
  document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
  document.querySelector("#wind").innerHTML = data.wind + "mph";
  document.querySelector("#uvIndex").innerHTML = data.main.uvIndex;
  // finish the rest of today for html
}

// five day
function showFiveDayWeather(data) {
  for (var i = 0; i < 5; i++) {

    // let tempLow = Math.floor(data.daily[i].temp.min);
    // let tempHigh = Math.floor(data.daily[i].temp.max);

    let day = document.createElement("div");
    day.innerHTML = [
      `<p>Temperature: ${data.daily[i].temp} F</p>`,
      `<p>Humidity: ${data.daily[i].humidity}%</p>`,
      `<p>Wind Speed: ${data.daily[i].wind_speed}</p>`,
      `<p>UV Index: ${data.daily[i].uvi}</p>`,
    ];
    document.querySelector("#fiveDayContainers").appendChild(day);
  }

  // document.querySelector("#currentCity").innerHTML = data.name;
  // document.querySelector("#temp").innerHTML = data.main.temp;
  // finish the rest of today for html
}

// Convert temp to C/F
function altTemp() {
  if (FC) {
    temp = (temp - 32) * (5 / 9);
    FC = false;
    $(".temp").text("C");
  } else {
    temp = temp * (9 / 5) + 32;
    FC = true;
    $(".temp").text("F");
  }
}
