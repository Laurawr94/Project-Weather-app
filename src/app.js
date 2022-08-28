function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function getForecast(coordinates) {
  let apiKey = `08609be667e09eedb6d9f6006bdd29fa`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function currentTemp(response) {
  celsiusTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".currentHumidity").innerHTML =
    response.data.main.humidity;
  document.querySelector(".currentWind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".dateTime").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = `08609be667e09eedb6d9f6006bdd29fa`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemp);
}
function searchSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
function calculateFahrenheit(event) {
  event.preventDefault();
  celsiusSelected.classList.remove("active");
  fahrenheitSelected.classList.add("active");
  document.querySelector("#temperature").innerHTML = Math.round(
    (celsiusTemp * 9) / 5 + 32
  );
}
function calculateCelsius(event) {
  event.preventDefault();
  celsiusSelected.classList.add("active");
  fahrenheitSelected.classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
}
function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="36" />
        <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )}°</span> |
            <span class="weather-forecast-temp-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  document.querySelector("#forecast").innerHTML = forecastHTML;
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);

let fahrenheitSelected = document.querySelector("#fahrenheit-link");
fahrenheitSelected.addEventListener("click", calculateFahrenheit);

let celsiusSelected = document.querySelector("#celsius-link");
celsiusSelected.addEventListener("click", calculateCelsius);

search("Cairns");
