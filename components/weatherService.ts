import axios from 'axios';

const WEATHER_API_KEY = '380641d202faba1ced587eef1b25c004';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const AQI_BASE_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';
const FORECAST_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

interface WeatherResponse {
weather: any;
aqi: any;
error?: boolean;
errorMessage?: string;
}

export const fetchForecast = async (city: string): Promise<any> => {
try {
const forecastUrl = `${FORECAST_BASE_URL}?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
const response = await axios.get(forecastUrl);
return response.data;
} catch (error) {
console.error('Forecast fetch error:', error);
    throw error;
  }
};

export const fetchWeatherAndAqi = async (city: string): Promise<WeatherResponse> => {
try {
// Construct the full weather URL
const weatherUrl = `${WEATHER_BASE_URL}?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
console.log('Fetching weather from:', weatherUrl);

    const weatherResponse = await axios.get(weatherUrl);
    console.log('Weather response:', weatherResponse.data);

    if (!weatherResponse.data.coord) {
      throw new Error('Invalid weather data received');
    }

    // Construct the full AQI URL
    const { lat, lon } = weatherResponse.data.coord;
    const aqiUrl = `${AQI_BASE_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
    console.log('Fetching AQI from:', aqiUrl);

    const aqiResponse = await axios.get(aqiUrl);
    console.log('AQI response:', aqiResponse.data);

    return {
      weather: weatherResponse.data,
      aqi: aqiResponse.data,
    };
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        params: error.config?.params
      }
    });

    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return {
          weather: null,
          aqi: null,
          error: true,
          errorMessage: 'Network error. Please check your internet connection.',
        };
      }

      if (error.response.status === 401) {
        return {
          weather: null,
          aqi: null,
          error: true,
          errorMessage: 'Invalid API key. Please check your configuration.',
        };
      }

      if (error.response.status === 404) {
        return {
          weather: null,
          aqi: null,
          error: true,
          errorMessage: 'City not found. Please check the spelling.',
        };
      }
    }

    return {
      weather: null,
      aqi: null,
      error: true,
      errorMessage: `Error: ${error.message}`,
    };
  }
};