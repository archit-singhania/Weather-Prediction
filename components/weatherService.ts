import axios from 'axios';

const WEATHER_API_KEY = '1c1de2436e2e11d145dcca5755907c2f';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';  // Changed to direct weather endpoint
const AQI_BASE_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';

interface WeatherResponse {
weather: any;
aqi: any;
error?: boolean;
errorMessage?: string;
}

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