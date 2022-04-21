// Selectors
var formSearchEl = document.querySelector("#form-search");
var cityInputEl = document.querySelector("#formGroupSearchCity");
var forecastContainer = document.querySelector("#container-forecast");
var todayContainer = document.querySelector("#forecast-today");
var searchHistoryContainer = document.querySelector("#search-history");

// API variables
var apiKey = "40e6ee37a2f9ea4fba4775f3ce087c54";

// This variable is to store search history. It also gets populated from local storage when the page loads.
var savedSearches = [];

// Fires when the user submits the form with the city they are searching for, puts their input into the city variable and then calls the getCityWeather, getCityForecast, and populateHistory functions
var searchSubmitHandler = function (event) {
  event.preventDefault();

  city = cityInputEl.value.trim();
  getCityWeather(city);
  getCityForecast(city);
};

// Fires when the user clicks a button from the search history. Uses text content of the button they clicked to fire getcityweather and getcityforecast
var historySearchHandler = function (event) {
  event.preventDefault();
  element = event.target;
  if (element.matches("button")) {
    var searchedCity = element.textContent;
    getCityWeather(searchedCity);
    getCityForecast(searchedCity);
  }
}

// Function to retrieve today's weather. It also calls populateHistory if a valid cityname was entered, otherwise it alerts the user that they entered an invalid city
var getCityWeather = function (cityName) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
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
        populateHistory(cityName);
      });
    }
    // This alerts the user if an invalid city is searched for
    else {
        // alert('Error: Invalid city.');
        invalidCityHandler();
    }
  });
};

function invalidCityHandler () {
  forecastContainer.innerHTML = "";
  var errorDisplay = document.createElement('div');
  var span = document.createElement('span');
  span.setAttribute('class', 'h2');
  span.textContent = "Sorry, that's not a valid city. Please check your search term and try again."
  errorDisplay.appendChild(span);
  forecastContainer.appendChild(errorDisplay);
}

// Function to retrieve 5-day forecast
var getCityForecast = function (cityName) {
  var queryURL =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  cityName +
  "&appid=" +
  apiKey +
  "&units=imperial";

  fetch(queryURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayCityForecast(data)
      });
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

// This fills the variables and populates the 5 day forecast content onto the page with the appropriate variables
var displayCityForecast = function (cityForecast) {
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

// This creates the search history buttons, and it splices off the oldest one once the array reaches 11 objects. It also deletes the oldest button once the array reaches 11 objects. It also fills localstorage with the current value of the savedSearches array
var populateHistory = function (city) {
  if (savedSearches.includes(city)) {
    return
  }
  var newBtn = document.createElement("button");
  newBtn.setAttribute("class", "btn btn-secondary col-12 w-100 mb-3");
  newBtn.textContent = city;
  savedSearches.unshift(city);
  searchHistoryContainer.prepend(newBtn);
  if (savedSearches.length > 10) {
    savedSearches.splice(10);
    var badChild = document.querySelector('#search-history :nth-child(10)');
    badChild.remove();
  }
  localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
}

// This fires when the page loads and checks local storage for saved Searches. If it's empty, it stops, if it's null, it sets SavedSearches to be an empty array. If there is content in localstorage, it creates buttons using that history and populates them in the search history part of the page
function init() {
  savedSearches = JSON.parse(localStorage.getItem("savedSearches"));
  if (savedSearches === []) {
    return
  }
  if (!savedSearches) {
    savedSearches = [];
    return
  }
  for (i = 0; i < savedSearches.length; i++) {
  var newBtn = document.createElement("button");
  newBtn.setAttribute("class", "btn btn-secondary col-12 w-100 mb-3");
  newBtn.textContent = savedSearches[i];
  searchHistoryContainer.appendChild(newBtn);
  }
}

init();

// Event Listeners
formSearchEl.addEventListener("submit", searchSubmitHandler);
searchHistoryContainer.addEventListener("click", historySearchHandler);