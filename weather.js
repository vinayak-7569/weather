document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("weatherResult").style.display = "none";
});

async function getWeather() {
    const apiKey = "fd8ec41cff04826225f30f05330648f4"; // Replace with your working API key
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        displayWeather(data);
    } catch (error) {
        document.getElementById("weatherResult").style.display = "block";
        document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

async function getWeatherByLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "fd8ec41cff04826225f30f05330648f4"; // Replace with your working API key
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                throw new Error(data.message);
            }

            displayWeather(data);
        } catch (error) {
            document.getElementById("weatherResult").style.display = "block";
            document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
        }
    }, () => {
        alert("Unable to retrieve location.");
    });
}

function displayWeather(data) {
    document.getElementById("weatherResult").style.display = "block";
    
    document.getElementById("cityName").innerHTML = `<strong>${data.name}, ${data.sys.country}</strong>`;
    document.getElementById("temperature").innerHTML = `Temperature: ${data.main.temp}°C`;
    document.getElementById("weatherDescription").innerHTML = `Weather: ${data.weather[0].description}`;
    document.getElementById("humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
    document.getElementById("windSpeed").innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById("feelsLike").innerHTML = `Feels Like: ${data.main.feels_like}°C`;
    document.getElementById("pressure").innerHTML = `Pressure: ${data.main.pressure} hPa`;
    document.getElementById("visibility").innerHTML = `Visibility: ${data.visibility / 1000} km`;

    // Convert UNIX timestamp for sunrise and sunset
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    
    document.getElementById("sunrise").innerHTML = `Sunrise: ${sunriseTime}`;
    document.getElementById("sunset").innerHTML = `Sunset: ${sunsetTime}`;
}
