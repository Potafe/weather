console.log("hello");

const form = document.querySelector("form");
const submitBTn = document.querySelector(".submit-btn");
const error = document.querySelector(".error-msg");
const main = document.querySelector(".main");
const weatherDetails = document.querySelector(".weather-details");
const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

form.addEventListener("submit", handleSubmit);
submitBTn.addEventListener("click", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  fetchWeather();
}

async function getWeatherData(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=62bcd081cd37416ba7b130841231012&q=${location}`,
    {
      mode: "cors",
    },
  );
  if (response.status === 400) {
    throwError();
  } else {
    error.style.display = "none";
    const weatherData = await response.json();
    const newData = processData(weatherData);
    displayData(newData);
    reset();
  }
}

function throwError() {
  error.style.display = "block";
  if (error.classList.contains("fade-in")) {
    error.style.display = "none";
    error.classList.remove("fade-in2");
    error.offsetWidth;
    error.classList.add("fade-in");
    error.style.display = "block";
  } else {
    error.classList.add("fade-in");
  }
}

function processData(weatherData) {
  const myData = {
    feelsLike: weatherData.current.condition.text,
    currentTemp: {
      c: Math.round(weatherData.current.temp_c),
      f: Math.round(weatherData.current.temp_f),
    },
    wind: Math.round(weatherData.current.wind_mph),
    humidity: weatherData.current.humidity,
    location: weatherData.location.name.toUpperCase(),
  };

  if (weatherData.location.country === "India") {
    myData["region"] = weatherData.location.region.toUpperCase();
  } else {
    myData["region"] = weatherData.location.country.toUpperCase();
  }
  console.log(myData);
  return myData;
}

function displayData(newData) {
  const weatherInfo = document.getElementsByClassName("info");
  weatherDetails.style.borderLeft = "0.2rem solid rgba(255, 255, 255, 0.5)";
  Array.from(weatherInfo).forEach((div) => {
    if (div.classList.contains("fade-in2")) {
      div.classList.remove("fade-in2");
      div.offsetWidth;
      div.classList.add("fade-in2");
    } else {
      div.classList.add("fade-in2");
    }
  });

  switch (newData.feelsLike) {
    case "Overcast":
    case "Partly cloudy":
    case "Cloudy":
      main.style.backgroundImage = 'url("./background-imgs/Overcast.jpg")';
      break;
    case "Mist":
    case "Fog":
      main.style.backgroundImage = 'url("./background-imgs/Mist.jpg")';
      break;
    case "Sunny":
    case "Clear":
      main.style.backgroundImage = 'url("./background-imgs/Sunny.jpg")';
      break;
    case "Thunder":
    case "Thundery outbreaks possible":
    case "Patchy light rain with thunders":
    case "Moderate or heavy rain with thunders":
    case "Patchy light snow with thunders":
    case "Moderate or heavy snow with thunders":
      main.style.backgroundImage = 'url("./background-imgs/Thunder.jpg")';
      break;
    case "Rain":
    case "Drizzle":
    case "Patchy rain possible":
    case "Patchy light rain":
    case "Light rain possible":
    case "Light rain":
    case "Moderate rain at times":
    case "Moderate rain":
    case "Heavy rain at times":
    case "Heavy rain":
    case "Light freezing rain":
    case "Moderate or heavy freezing rain":
    case "Patchy freezing drizzle possible":
    case "Patchy light drizzle":
    case "Light drizzle":
    case "Freezing drizzle":
    case "Heavy freezing drizzle":
      main.style.backgroundImage = 'url("./background-imgs/Rain.jpg")';
      break;
    case "Light snow":
    case "Patchy snow possible":
    case "Blowing snow":
    case "Patchy light snow":
    case "Patchy moderate snow":
    case "Moderate snow":
    case "Patchy heavy snow":
    case "Light snow showers":
    case "Moderate or heavy snow showers":
      main.style.backgroundImage = 'url("./background-imgs/Snow.jpg")';
      break;
    default:
      break;
  }

  if (toggleSwitch.checked) {
    document.querySelector(".degrees").textContent = newData.currentTemp.f;
  } else {
    document.querySelector(".degrees").textContent = `${
      newData.currentTemp.c + "°C"
    }`;
  }

  document.querySelector(".location").textContent =
    `${newData.location}, ${newData.region}`;
  document.querySelector(".feels-like").textContent =
    `CONDITION: ${newData.feelsLike.toUpperCase()}`;
  document.querySelector(".wind-mph").textContent = `WIND: ${newData.wind} MPH`;
  document.querySelector(".humidity").textContent =
    `HUMIDITY: ${newData.humidity}%`;

  toggleSwitch.addEventListener("change", () => {
    if (toggleSwitch.checked) {
      document.querySelector(".degrees").textContent = `${
        newData.currentTemp.f + "°F"
      } `;
      console.log("checked");
    } else {
      document.querySelector(".degrees").textContent = `${
        newData.currentTemp.c + "°C"
      } `;
      console.log("unchecked");
    }
  });
}

function reset() {
  form.reset();
}

function fetchWeather() {
  const input = document.querySelector('input[type="text"]');
  const userLocation = input.value;
  getWeatherData(userLocation);
}
