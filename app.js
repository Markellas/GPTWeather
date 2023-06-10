const apiKey = 'b4de76d85a5824ca620e5600a0a99d3d';
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherIcon = document.querySelector('.weather-icon');
const weatherTemp = document.querySelector('.weather-temp');
const weatherCity = document.querySelector('.weather-city');
const weatherDesc = document.querySelector('.weather-desc');
const weatherHumidity = document.querySelector('.weather-humidity');
const weatherWind = document.querySelector('.weather-wind');
const weatherInfo = document.querySelector('.weather-info');
const forecastContainer = document.querySelector('.forecast-container');
const body = document.body;

searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== '') {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    Promise.all([fetch(currentWeatherUrl), fetch(forecastUrl)])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        const currentWeatherData = data[0];
        const forecastData = data[1];

        renderCurrentWeather(currentWeatherData);
        renderForecast(forecastData);
        setBodyBackground(currentWeatherData.weather[0].main.toLowerCase());
      })
      .catch(error => {
        console.error(error);
        weatherInfo.innerHTML =
          "<p>⚠️ The city in which you are trying to find out the weather does not exist. You're not an alien, are you?</p>";
        weatherInfo.style.display = 'block';
      });
  }
});

function renderCurrentWeather(data) {
  const iconClass = `wi wi-owm-${data.weather[0].id}`;
  const weatherCondition = data.weather[0].main.toLowerCase();
  const weatherIconClass = getWeatherIconClass(weatherCondition);
  const temperature = `${data.main.temp.toFixed(1)}&deg;C`;

  weatherIcon.className = `weather-icon wi ${iconClass} ${weatherIconClass}`;
  weatherTemp.innerHTML = temperature;
  weatherCity.innerHTML = data.name;
  weatherDesc.innerHTML = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
  weatherHumidity.innerHTML = `<i class="fas fa-tint"></i> ${data.main.humidity}%`;
  weatherWind.innerHTML = `<i class="fas fa-wind"></i> ${data.wind.speed} m/s`;

  weatherInfo.style.display = 'block';
}

function renderForecast(forecastData) {
  forecastContainer.innerHTML = '';

  const forecasts = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));
  forecasts.slice(0, 5).forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const iconClass = `wi wi-owm-${forecast.weather[0].id}`;
    const weatherCondition = forecast.weather[0].main.toLowerCase();
    const weatherIconClass = getWeatherIconClass(weatherCondition);
    const temperature = `${forecast.main.temp.toFixed(1)}&deg;C`;

    const forecastItem = document.createElement('div');
    forecastItem.className = 'forecast-item';
    forecastItem.innerHTML = `
      <div class="forecast-day">${dayOfWeek}</div>
      <div class="forecast-icon"><i class="weather-icon wi ${iconClass} ${weatherIconClass}"></i></div>
      <div class="forecast-temp">${temperature}</div>
    `;

    forecastContainer.appendChild(forecastItem);
  });
}

function getWeatherIconClass(weatherCondition) {
  const weatherIcons = {
    'clear': 'wi-day-sunny',
    'clouds': 'wi-cloudy',
    'drizzle': 'wi-sprinkle',
    'rain': 'wi-rain',
    'thunderstorm': 'wi-thunderstorm',
    'snow': 'wi-snow',
    'mist': 'wi-fog',
    'smoke': 'wi-smoke',
    'haze': 'wi-day-haze',
    'dust': 'wi-dust',
    'fog': 'wi-fog',
    'sand': 'wi-sandstorm',
    'ash': 'wi-volcano',
    'squall': 'wi-strong-wind',
    'tornado': 'wi-tornado',
  };
  return weatherIcons[weatherCondition] || '';
}

function setBodyBackground(weatherCondition) {
  const gradientMap = {
    'clear': 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    'clouds': 'linear-gradient(120deg, #324752 0%, #636566 100%)',
    'drizzle': 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
    'rain': 'linear-gradient(120deg, #303538 0%, #0a2536 100%)',
    'thunderstorm': 'linear-gradient(120deg, #bdc3c7 0%, #2c3e50 100%)',
    'snow': 'linear-gradient(120deg, #e6dada 0%, #274046 100%)',
    'mist': 'linear-gradient(120deg, #e6dada 0%, #274046 100%)',
    'smoke': 'linear-gradient(120deg, #e6dada 0%, #274046 100%)',
    'haze': 'linear-gradient(120deg, #bdc3c7 0%, #2c3e50 100%)',
    'dust': 'linear-gradient(120deg, #bdc3c7 0%, #2c3e50 100%)',
    'fog': 'linear-gradient(120deg, #bdc3c7 0%, #2c3e50 100%)',
    'sand': 'linear-gradient(120deg, #bdc3c7 0%, #2c3e50 100%)',
    'ash': 'linear-gradient(120deg, #bdc3c7 0%, #2c3e50 100%)',
    'squall': 'linear-gradient(120deg, #bdc3c7 0%, #2c3e50 100%)',
    'tornado': 'linear-gradient(120deg, #bdc3c7 0%, #2c3e50 100%)',
  };

  const gradient = gradientMap[weatherCondition] || 'linear-gradient(120deg, #bdc3c7 0%, #2c3e50 100%)';
  document.body.style.backgroundImage = gradient;
}