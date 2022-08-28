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
function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" width="36" />
        <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max">24°</span> |
            <span class="weather-forecast-temp-min">18°</span>
        </div>
      </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;

  document.querySelector("#forecast").innerHTML = forecastHTML;
}

let celsiusTemp = null;

displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);

let fahrenheitSelected = document.querySelector("#fahrenheit-link");
fahrenheitSelected.addEventListener("click", calculateFahrenheit);

let celsiusSelected = document.querySelector("#celsius-link");
celsiusSelected.addEventListener("click", calculateCelsius);

search("Cairns");
