let now = new Date(); 
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
let month = months[now.getMonth()]; 
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 
let day = days[now.getDay()];
let date = now.getDate();
let year = now.getFullYear(); 
let hour = now.getHours(); 
let minute = now.getMinutes();
 function transformMinute (minute) {
if (minute.toString().length < 2) {
  return `0${minute}`
} else {
  return minute
}
 }

let minutes = transformMinute(minute);

let liveDate = document.querySelector("p.date");
liveDate.innerHTML = `${day}, ${date} ${month} ${year}`;

let liveTime = document.querySelector("p.time"); 
liveTime.innerHTML = `${hour}:${minutes}`;


function changeUnitC(event) {
  let temperature = document.querySelector("#current-degrees");
  let unitC = document.querySelector("#current-tempC")
  let unitF = document.querySelector("#current-tempF")
   
    temperature.innerHTML = 15;
    unitC.setAttribute("style", "font-size: 30px;");
    unitF.setAttribute("style", "font-size: 20px;");
}
    
function changeUnitF(event) {
  let temperature = document.querySelector("#current-degrees");
  let unitC = document.querySelector("#current-tempC")
  let unitF = document.querySelector("#current-tempF")
  
    temperature.innerHTML = 59;
    unitF.setAttribute("style", "font-size: 30px;");
    unitC.setAttribute("style", "font-size: 20px;");
}

let currentTempC = document.querySelector("#current-tempC");
currentTempC.addEventListener("click", changeUnitC);

let currentTempF = document.querySelector("#current-tempF");
currentTempF.addEventListener("click", changeUnitF);

function localWeather() {

function getLocalWeather(latitude, longitude) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  let apiKey = `c74772c1a52f7f9f082fe3de119d5275`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocalWeather);

function transformWindDirection(windDegrees) {
  let direction = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N" ]; 
  let windDirection = direction[Math.trunc(windDegrees/22.5 + 0.5)];
  return windDirection;
}


  function showLocalWeather(response) {
    let temperature = response.data.main.temp;
    temperature = Math.round(temperature);
    let description = response.data.weather[0].description;
    let pressure = response.data.main.pressure;
    let feelsLike = response.data.main.feels_like;
    feelsLike = Math.round(feelsLike);
    let rain = response.data.main.humidity;
    let windSpeed = response.data.wind.speed;
    windSpeed = Math.round(windSpeed);
    let windDegrees = response.data.wind.deg;
    let windDirection = transformWindDirection(windDegrees);

    let localTemp = document.querySelector("#current-degrees");
    localTemp.innerHTML = temperature;
    let localDescription = document.querySelector("#description");
    localDescription.innerHTML = description;
    let localP = document.querySelector("#current-pressure");
    localP.innerHTML = pressure;
    let localFeelsLike = document.querySelector("#current-feels-like");
    localFeelsLike.innerHTML = feelsLike;
    let localRain = document.querySelector("#current-rain");
    localRain.innerHTML = rain;
    let localSpeed = document.querySelector("#wind-speed");
    localSpeed.innerHTML = windSpeed;
    let localDirection = document.querySelector("#wind-direction");
    localDirection.innerHTML = windDirection;
    let currentLocation = document.querySelector("#current-city"); 
    currentLocation.innerHTML = response.data.name;
    console.log(response);
  }
  
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude; 
  console.log(latitude);
  console.log(longitude);
  getLocalWeather(latitude, longitude);
}

navigator.geolocation.getCurrentPosition(getLocation); 
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", localWeather);

function getCityWeather(event) {
  event.preventDefault();
  let SearchCity = document.querySelector("#search-city"); 
  let newCity = SearchCity.value;
  
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric`;
  let apiKey = `c74772c1a52f7f9f082fe3de119d5275`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCityWeather);

  function transformWindDirection(windDegrees) {
  let direction = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N" ]; 
  let windDirection = direction[Math.trunc(windDegrees/22.5 + 0.5)];
  return windDirection;
  }

  function showCityWeather(response) {
    let temperature = response.data.main.temp;
    temperature = Math.round(temperature);
    let description = response.data.weather[0].description;
    let pressure = response.data.main.pressure;
    let feelsLike = response.data.main.feels_like;
    feelsLike = Math.round(feelsLike);
    let rain = response.data.main.humidity;
    let windSpeed = response.data.wind.speed;
    windSpeed = Math.round(windSpeed);
    let windDegrees = response.data.wind.deg;
    let windDirection = transformWindDirection(windDegrees);

    let cityTemp = document.querySelector("#current-degrees");
    cityTemp.innerHTML = temperature;
    let cityDescription = document.querySelector("#description");
    cityDescription.innerHTML = description;
    let cityP = document.querySelector("#current-pressure");
    cityP.innerHTML = pressure;
    let cityFeelsLike = document.querySelector("#current-feels-like");
    cityFeelsLike.innerHTML = feelsLike;
    let cityRain = document.querySelector("#current-rain");
    cityRain.innerHTML = rain;
    let citySpeed = document.querySelector("#wind-speed");
    citySpeed.innerHTML = windSpeed;
    let cityDirection = document.querySelector("#wind-direction");
    cityDirection.innerHTML = windDirection;
    let currentCity = document.querySelector("#current-city");
    currentCity.innerHTML = response.data.name;
    console.log(response);
    
  }

}
let searchCity = document.querySelector("#search-bar");
searchCity.addEventListener("submit", getCityWeather);

localWeather();
