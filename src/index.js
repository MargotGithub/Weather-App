let dateEl = document.querySelector("h2");
let currentTime = new Date();
let day = currentTime.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

dateEl.innerHTML = `${days[day]} ${hour}:${minute}`;

function search(event) {
  event.preventDefault();
  let h1El = document.querySelector("h1");
  let cityInput = document.querySelector("#city");
  console.log(cityInput.value);
  showPositionFromLocation(cityInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionFromLatLon);
}
let buttonCurrent = document.querySelector("#current");
buttonCurrent.addEventListener("click", currentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(temperature * 9) / 5 + 32;
  let unitElement = document.querySelector("#units");
  unitElement.innerHTML = "°F";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function showWeather(response) {
  console.log(response);
  let h1El = document.querySelector("h1");
  let temperatureElement = document.querySelector("#temperature");
  h1El.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
}

function showPositionFromLatLon(position) {
  let apiKey = `ebef9ca4a8de66ed586fac628fade056`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showPositionFromLocation(cityInput) {
  let apiKey = `ebef9ca4a8de66ed586fac628fade056`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  console.log(url);
  axios.get(url).then(showWeather);
}
