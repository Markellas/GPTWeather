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

searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== '') {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const iconClass = `wi wi-owm-${data.weather[0].id}`;
        const weatherCondition = data.weather[0].main.toLowerCase();
        const weatherIconClass = getWeatherIconClass(weatherCondition);
        weatherIcon.className = `weather-icon wi ${iconClass} ${weatherIconClass}`;
        weatherTemp.innerHTML = `${data.main.temp}&deg;C`;
        weatherCity.innerHTML = data.name;
        weatherDesc.innerHTML = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
        weatherHumidity.innerHTML = `<i class="fas fa-tint"></i> ${data.main.humidity}%`;
        weatherWind.innerHTML = `<i class="fas fa-wind"></i> ${data.wind.speed} m/s`;

        weatherInfo.style.display = 'block';
      })
      .catch(error => {
        console.error(error);
        weatherInfo.innerHTML = '<p>An error occurred while retrieving the weather information. Please try again later.</p>';
        weatherInfo.style.display = 'block';
      });
  }
});

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


