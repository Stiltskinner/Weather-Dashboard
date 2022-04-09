// Psuedocode
// Need to retrieve weather data from weather api based on user input
// Need an event listener for the search button
// Need an event listener for the saved cities buttons

// Need a function to populate current weather
// Need a function to create cards and populate them
// Need a function to take user input and put it in a variable
// Need a function to take user input variable and search through array from api for the city, then pull the temp wind humidity and uv index properties for that city. Also needs to pull the day 5 day forecast properties for that city
// Need a function to save searched cities in local storage
// Need a function to generate the search history cities list from local storage

// Selectors
var formSearchEl = document.querySelector("#form-search");
var cityInputEl = document.querySelector("#formGroupSearchCity");
var citySearchTerm = document.querySelector("#city-search-term");

// API variables
var apiKey = "40e6ee37a2f9ea4fba4775f3ce087c54";

// Fires when the user submits the form with the city they are searching for, puts their input into the city variable and then calls the getCityWeather function
var searchSubmitHandler = function (event) {
  event.preventDefault();

  city = cityInputEl.value.trim();
  getCityWeather(city);
};

var getCityWeather = function (cityName) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(queryURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayCityWeather(data, cityName)
      });
    }
    // This else should eventually display an error message as text on the actual webpage
    else {
        alert('Error: ' +response.statusText);
    }
  });
};

var displayCityWeather = function (cityWeather, searchTerm) {
    citySearchTerm.textContent = searchTerm;
    var tempToday = cityWeather.main.temp;
    console.log(tempToday);
}

formSearchEl.addEventListener("submit", searchSubmitHandler);
