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
var forecastContainer = document.querySelector("#container-forecast");
var todayContainer = document.querySelector("#forecast-today");
var searchHistoryContainer = document.querySelector("#search-history");

// API variables
var apiKey = "40e6ee37a2f9ea4fba4775f3ce087c54";

// Fires when the user submits the form with the city they are searching for, puts their input into the city variable and then calls the getCityWeather and getCityForecast functions
var searchSubmitHandler = function (event) {
  event.preventDefault();
  element = event.target;
  city = cityInputEl.value.trim();
  getCityWeather(city);
  getCityForecast(city);
};

var historySearchHandler = function (event) {
  event.preventDefault();
  if (element.matches("button")) {
  
  }
}

// Function to retrieve today's weather
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
        var cityName = data.name;
        displayCityWeather(data, cityName)
      });
    }
    // This else should eventually display an error message as text on the actual webpage
    else {
        alert('Error: ' +response.statusText);
    }
  });
};

// Function to retrieve 5-day forecast
var getCityForecast = function (cityName) {
  var queryURL =
  "http://api.openweathermap.org/data/2.5/forecast?q=" +
  cityName +
  "&appid=" +
  apiKey +
  "&units=imperial";

  fetch(queryURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var cityName = data.name;
        displayCityForecast(data, cityName)
      });
    }
    // This else should eventually display an error message as text on the actual webpage
    else {
        alert('Error: ' +response.statusText);
    }
  });
};


// Creates containers and elements and fills them with appropriate data from the weather api, then appends them to the html. Pulls the appropriate icon for weather based on weather api icon code from the icons folder
var displayCityWeather = function (cityWeather, cityName) {
    forecastContainer.innerHTML = "";
    var icon = cityWeather.weather[0].icon;
    var cityDisplay = document.createElement('div');
    cityDisplay.setAttribute('class', 'col-12 my-3 border border-dark');
    var span = document.createElement('span');
    span.setAttribute('id', 'city-search-term');
    span.setAttribute('class', 'h2');
    span.innerHTML = cityName + " " + moment().format("LLL") + `<img src="./Assets/openweathermap-api-icons-master/icons/` + icon+ `.png">`;
    cityDisplay.appendChild(span);
    forecastContainer.appendChild(cityDisplay);
    // cityName.innerHTML = cityName + " " + moment().format("LLL") + `<img src="./Assets/openweathermap-api-icons-master/icons/` + icon+ `.png">`;
    var tempToday = "Temp: " + cityWeather.main.temp + "°F";
    var windToday = "Wind: " + cityWeather.wind.speed + " MPH";
    var humidToday = "Humidity: " + cityWeather.main.humidity + " %";
    var temp = document.createElement('p');
    var wind = document.createElement('p');
    var humidity = document.createElement('p');
    temp.textContent = tempToday;
    wind.textContent = windToday;
    humidity.textContent = humidToday;
    cityDisplay.appendChild(temp);
    cityDisplay.appendChild(wind);
    cityDisplay.appendChild(humidity);
}

// This fills the variables and populates the 5 day forecast content onto the page
var displayCityForecast = function (cityForecast, cityName) {
  var forecast5Container = document.createElement("div");
  forecast5Container.setAttribute("class", "row px-0 w-100 ml-3")

  var forecast5Header = document.createElement("div");
  forecast5Header.setAttribute("class", "col-12 h4 p-0");
  forecast5Header.textContent = "5-Day Forecast:";

  var forecast5cardcontainer = document.createElement("div");
  forecast5cardcontainer.setAttribute("class", "row container-fluid justify-content-between");

  forecastContainer.appendChild(forecast5Container);
  forecast5Container.appendChild(forecast5Header);
  forecast5Container.appendChild(forecast5cardcontainer);

  // Starts at 4 because that is 9 AM, and then adds 8 to jump to the next day
  for (i = 4; i<cityForecast.list.length; i=i+8) {
    var newCard = document.createElement("div");
    newCard.setAttribute("class", "card card-5day col mr-4 mb-2");
    var icon = cityForecast.list[i].weather[0].icon;
    var dateUnix = cityForecast.list[i].dt;
    var dateContent = moment.unix(dateUnix).format('l');
    var tempForecast = "Temp: " + cityForecast.list[i].main.temp + "°F";
    var windForecast = "Wind: " + cityForecast.list[i].wind.speed + " MPH";
    var humidForecast = "Humidity: " + cityForecast.list[i].main.humidity + "%";
    var date = document.createElement('p');
    date.setAttribute("class", "h5");
    var temp = document.createElement('p');
    var wind = document.createElement('p');
    var humidity = document.createElement('p');
    var iconContainer = document.createElement('span');
    iconContainer.setAttribute("class", "icon-size")
    iconContainer.innerHTML = `<img src="./Assets/openweathermap-api-icons-master/icons/` + icon+ `.png">`
    date.textContent= dateContent;
    temp.textContent = tempForecast;
    wind.textContent = windForecast;
    humidity.textContent = humidForecast;
    newCard.appendChild(date);
    newCard.appendChild(iconContainer);
    newCard.appendChild(temp);
    newCard.appendChild(wind);
    newCard.appendChild(humidity);
    forecast5cardcontainer.appendChild(newCard);
  }
}

formSearchEl.addEventListener("submit", searchSubmitHandler);
searchHistoryContainer.addEventListener("click", historySearchHandler);

// <button class="btn btn-secondary col-12 w-100 mb-3">Placeholder</button>