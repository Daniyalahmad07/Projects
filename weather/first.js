let searchBox = document.querySelector('#search-box');
let searchButton = document.querySelector('.search-button');
const APIKEY = `b4d920ff14839a7d1ad241b51ee90210`;
let tempDisplay = document.querySelector(".temp");
let humidityDisplay = document.querySelector('.humidity-value');
let windSpeedDisplay = document.querySelector('.wind-value');
let cityDisplay = document.querySelector(".city");
let weatherIcon = document.querySelector(".weather-icon");

let udpateCity = (city) => {
    cityDisplay.innerHTML = `${city}`;
}

let  updateTemp = (temp) => {
    tempDisplay.innerHTML = `${temp} °C`;
    
}

let updateHumidity = (humidity) => {
    humidityDisplay.innerHTML = `${humidity} %`
}

let updateWindSpeed = (windSpeed) => {
    windSpeedDisplay.innerHTML = `${windSpeed} meter/sec`;
}

let updateWeatherIcon = (iconSrc) => {
    weatherIcon.src = `images/${iconSrc[0].main}.png`;
}

let updates = (formattedResult) => {
    updateWeatherIcon(formattedResult.weather);
    udpateCity(formattedResult.name);
    updateTemp(formattedResult.main.temp);
    updateHumidity(formattedResult.main.humidity);
    updateWindSpeed(formattedResult.wind.speed)
}

let initialUpdate = async () => {
    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${APIKEY}&units=metric`);
    let formattedResult = await result.json();
    updates(formattedResult);
}
initialUpdate();

searchButton.addEventListener("click" , async () => {
    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&appid=${APIKEY}&units=metric`);
    let formattedResult = await result.json();
    if(formattedResult.cod == 404){
        alert("Enter a valid Name");
    }
   else{
    updateWeatherIcon(formattedResult.weather);
    udpateCity(searchBox.value);
    updateTemp(formattedResult.main.temp);
    updateHumidity(formattedResult.main.humidity);
    updateWindSpeed(formattedResult.wind.speed);
   }
})