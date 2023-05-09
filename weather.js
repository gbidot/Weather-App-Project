// Get a reference to the form element in the HTML
const weatherForm = document.getElementById("weather-form");
// Get a reference to the city input field in the HTML
const cityInput = document.getElementById("city");
// Get a reference to the div where the weather information will be displayed
const weatherInfo = document.getElementById("weather-info");

// Store the OpenWeatherMap API key as a constant
const apiKey = "65adc831091f558e215406ad152a256f"; // Replace with your OpenWeatherMap API key

// Add an event listener to the form that will run when the form is submitted
weatherForm.addEventListener("submit", async (event) => {
    // Prevent the default form submission action (which would reload the page)
    event.preventDefault();
    // Get the value entered in the city input field
    const city = cityInput.value;
    // Call the getWeatherData function to fetch the weather data from the API
    // Wait for the data to be returned before continuing (this is what "await" does)
    const weatherData = await getWeatherData(city, apiKey);
    // Call the displayWeatherData function to display the fetched data on the webpage
    displayWeatherData(weatherData);
});

// This function fetches the weather data for the specified city from the OpenWeatherMap API
async function getWeatherData(city, apiKey) {
    // Construct the API request URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    // Fetch the data from the API (this is asynchronous, so we use "await" to wait for the response)
    const response = await fetch(url);
    // Convert the response data to a JavaScript object (this is also asynchronous, so we use "await" again)
    const data = await response.json();
    // Return the data
    return data;
}

// This function displays the weather data on the webpage
function displayWeatherData(data) {
    // If the API response has a "cod" property with the value "404", display a "City not found" message
    if (data.cod === "404") {
        weatherInfo.innerHTML = `<p>City not found</p>`;
    } else {
        // Otherwise, display the weather data
        // The information is extracted from the data object using dot notation
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    }
}
