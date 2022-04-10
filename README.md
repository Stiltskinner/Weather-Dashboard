# Weather-Dashboard
A Weather Dashboard for finding weather forecasts for cities and saving favorites

## Functionality
<p>The user types a city into a search bar, and the page displays the city's name, the date and time, today's weather icon, temperature, wind, and humidity. It also displays a 5 day weather forecast with the same information. Additionally, it saves the 10 most recent searches as buttons, which can be clicked to re-run the same search.</p>
<br>
<p>Local storage also keeps the 10 most recent searches and populates the search history bar on page load.</p>

## Design Process
<p>The HTML is created using bootstrap. There are a few static elements, such as the search form and the container for all the weather data. Most HTML elements are generated dynamically in JS.</p>
<br>
<p>The script.js pulls weather data from the openweather API and uses that to generate elements that display the weather to the user. See script.js for detailed comments on how all of the functions work.</p>

<br>
Repository Link: https://github.com/Stiltskinner/Weather-Dashboard
<br>
Deployed webpage: https://stiltskinner.github.io/Weather-Dashboard/
<br>
Screenshot of Deploayed Webpage

![Screenshot of webpage](./Assets/Weather%20Dashboard.gif)