function currentTemp(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#currentDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".currentHumidity").innerHTML =
    response.data.main.humidity;
  document.querySelector(".currentWind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let cityName = `London`;
let apiKey = `08609be667e09eedb6d9f6006bdd29fa`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(currentTemp);

// https://api.openweathermap.org/data/2.5/weather?q=London&appid=08609be667e09eedb6d9f6006bdd29fa&units=metric
