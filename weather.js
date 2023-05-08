const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city");
const weatherInfo = document.getElementById("weather-info");

const apiKey = "65adc831091f558e215406ad152a256f"; // Replace with your OpenWeatherMap API key

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value;
    const weatherData = await getWeatherData(city, apiKey);
    displayWeatherData(weatherData);
});

async function getWeatherData(city, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function displayWeatherData(data) {
    if (data.cod === "404") {
        weatherInfo.innerHTML = `<p>City not found</p>`;
    } else {
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    }
}
