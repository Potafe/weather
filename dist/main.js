(() => {
  console.log("hello");
  const e = document.querySelector("form"),
    t = document.querySelector(".submit-btn"),
    a = document.querySelector(".error-msg"),
    n = document.querySelector(".main"),
    c = document.querySelector(".weather-details"),
    s = document.querySelector('.switch input[type="checkbox"]');
  function r(t) {
    t.preventDefault(),
      (async function (t) {
        const r = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=62bcd081cd37416ba7b130841231012&q=${t}`,
          { mode: "cors" },
        );
        400 === r.status
          ? ((a.style.display = "block"),
            a.classList.contains("fade-in")
              ? ((a.style.display = "none"),
                a.classList.remove("fade-in2"),
                a.offsetWidth,
                a.classList.add("fade-in"),
                (a.style.display = "block"))
              : a.classList.add("fade-in"))
          : ((a.style.display = "none"),
            (function (e) {
              const t = document.getElementsByClassName("info");
              switch (
                ((c.style.borderLeft = "0.2rem solid rgba(255, 255, 255, 0.5)"),
                Array.from(t).forEach((e) => {
                  e.classList.contains("fade-in2")
                    ? (e.classList.remove("fade-in2"),
                      e.offsetWidth,
                      e.classList.add("fade-in2"))
                    : e.classList.add("fade-in2");
                }),
                e.feelsLike)
              ) {
                case "Overcast":
                case "Partly cloudy":
                case "Cloudy":
                  n.style.backgroundImage =
                    'url("./background-imgs/Overcast.jpg")';
                  break;
                case "Mist":
                case "Fog":
                  n.style.backgroundImage = 'url("./background-imgs/Mist.jpg")';
                  break;
                case "Sunny":
                case "Clear":
                  n.style.backgroundImage =
                    'url("./background-imgs/Sunny.jpg")';
                  break;
                case "Thunder":
                case "Thundery outbreaks possible":
                case "Patchy light rain with thunders":
                case "Moderate or heavy rain with thunders":
                case "Patchy light snow with thunders":
                case "Moderate or heavy snow with thunders":
                  n.style.backgroundImage =
                    'url("./background-imgs/Thunder.jpg")';
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
                  n.style.backgroundImage = 'url("./background-imgs/Rain.jpg")';
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
                  n.style.backgroundImage = 'url("./background-imgs/Snow.jpg")';
              }
              s.checked
                ? (document.querySelector(".degrees").textContent =
                    e.currentTemp.f)
                : (document.querySelector(".degrees").textContent =
                    e.currentTemp.c + "°C"),
                (document.querySelector(".location").textContent =
                  `${e.location}, ${e.region}`),
                (document.querySelector(".feels-like").textContent =
                  `CONDITION: ${e.feelsLike.toUpperCase()}`),
                (document.querySelector(".wind-mph").textContent =
                  `WIND: ${e.wind} MPH`),
                (document.querySelector(".humidity").textContent =
                  `HUMIDITY: ${e.humidity}%`),
                s.addEventListener("change", () => {
                  s.checked
                    ? ((document.querySelector(".degrees").textContent =
                        e.currentTemp.f + "°F "),
                      console.log("checked"))
                    : ((document.querySelector(".degrees").textContent =
                        e.currentTemp.c + "°C "),
                      console.log("unchecked"));
                });
            })(
              (function (e) {
                const t = {
                  feelsLike: e.current.condition.text,
                  currentTemp: {
                    c: Math.round(e.current.temp_c),
                    f: Math.round(e.current.temp_f),
                  },
                  wind: Math.round(e.current.wind_mph),
                  humidity: e.current.humidity,
                  location: e.location.name.toUpperCase(),
                };
                return (
                  "India" === e.location.country
                    ? (t.region = e.location.region.toUpperCase())
                    : (t.region = e.location.country.toUpperCase()),
                  console.log(t),
                  t
                );
              })(await r.json()),
            ),
            e.reset());
      })(document.querySelector('input[type="text"]').value);
  }
  e.addEventListener("submit", r), t.addEventListener("click", r);
})();
