// script.js

// API key for OpenWeatherMap
const apiKey = 'e842215d1166cd9ea60fcd3b290a3fa6';

// DOM elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');
const searchHistoryList = document.getElementById('search-history');

// Event listener for form submission
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = searchInput.value.trim();
  if (city !== '') {
    getWeather(city);
    searchInput.value = '';
  }
});

// Function to fetch weather data from OpenWeatherMap API
const getWeather = async (city) => {
  try {
    // Fetch current weather data
    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const currentWeatherData = await currentWeatherResponse.json();
    
    // Fetch forecast weather data
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const forecastData = await forecastResponse.json();
    
    // Update DOM with current weather data
    updateCurrentWeather(currentWeatherData);
    
    // Update DOM with forecast weather data
    updateForecast(forecastData);
    
    // Update search history
    updateSearchHistory(city);
  } catch (error) {
    console.error(error);
  }
};

// Function to update DOM with current weather data
const updateCurrentWeather = (currentWeatherData) => {
  currentWeatherContainer.innerHTML = `
    <h2>${currentWeatherData.name} (${new Date().toLocaleDateString()})</h2>
    <div>
      <img src="http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}.png" alt="${currentWeatherData.weather[0].description}">
      <p>Temperature: ${currentWeatherData.main.temp}°C</p>
      <p>Humidity: ${currentWeatherData.main.humidity}%</p>
      <p>Wind Speed: ${currentWeatherData.wind.speed} km/h</p>
    </div>
  `;
};

// Function to update DOM with forecast weather data
const updateForecast = (forecastData) => {
  forecastContainer.innerHTML = '';
  for (let i = 0; i < forecastData.list.length; i += 8) {
    const forecast = forecastData.list[i];
    const forecastDate = new Date(forecast.dt * 1000);
    
    const forecastElement = document.createElement('div');
    forecastElement.classList.add('forecast-item');
    forecastElement.innerHTML = `
      <p class="forecast-date">${forecastDate.toLocaleDateString()}</p>
      <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
      <p class="forecast-temp">Temperature: ${forecast.main.temp}°C</p>
      <p class="forecast-humidity">Humidity: ${forecast.main.humidity}%</p>
      
      `;

    forecastContainer.appendChild(forecastElement);
  }
};



