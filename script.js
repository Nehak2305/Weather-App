
    const apiKey = "cba7514a21b5c5fd85eb6e53b017b4ea";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function fetchWeather(city) {
    const cityUrl = apiUrl + city + `&appid=${apiKey}`;
    // console.log('City URL:', cityUrl);
    const getPromise = axios.get(cityUrl);

    getPromise.then((response) => {
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const weatherData = response.data;
            console.log(weatherData);
    
            document.querySelector(".city").innerHTML = weatherData.name;
            document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp) + "&deg;C";
            document.querySelector(".humidity").innerHTML = weatherData.main.humidity + "%";
            document.querySelector(".wind").innerHTML = weatherData.wind.speed + " Km/h";
    
            if (weatherData.weather[0].main === "Clouds") {
                weatherIcon.src = "images/images/clouds.png";
            } else if (weatherData.weather[0].main === "Rain") {
                weatherIcon.src = "images/images/rain.png";
            } else if (weatherData.weather[0].main === "Mist") {
                weatherIcon.src = "images/images/mist.png";
            } else if (weatherData.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/images/drizzle.png";
            } else if (weatherData.weather[0].main === "Clear") {
                weatherIcon.src = "images/images/clear.png";
            }
    
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    }).catch((error) => {
        console.error('Error fetching weather data:', error.message);
    });
}

searchBtn.addEventListener("click", () => {
    fetchWeather(searchBox.value);
});
