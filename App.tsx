import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { fetchWeatherAndAqi, fetchForecast } from './components/weatherService';
import WeatherCard from './components/weatherCard';
import ForecastCard from './components/forecastCard';
import WeatherMap from './components/weatherMap';

interface WeatherData {
  weather: {
    name: string;
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
    }>;
  };
  aqi: {
    list: Array<{
      main: {
        aqi: number;
      };
    }>;
  };
}

function App(): JSX.Element {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [forecastPeriod, setForecastPeriod] = useState<'3day' | '5day'>('3day');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'weather' | 'aqi' | 'forecast' | 'map'>('weather');

  const handleFetchData = async (): Promise<void> => {
    if (!city) {
      alert('Please enter a city');
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetchWeatherAndAqi(city),
        fetchForecast(city),
      ]);

      if (weatherResponse.error) {
        setError(true);
        alert(weatherResponse.errorMessage || 'City not found. Please check the spelling and try again.');
      } else {
        setWeatherData(weatherResponse);
        setForecastData(forecastResponse);
      }
    } catch (error) {
      setError(true);
      alert('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={handleFetchData}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="words"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleFetchData}
            disabled={loading}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {weatherData && (
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'weather' && styles.activeTab]}
              onPress={() => setActiveTab('weather')}
            >
              <Text style={[styles.tabText, activeTab === 'weather' && styles.activeTabText]}>
                Weather
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'aqi' && styles.activeTab]}
              onPress={() => setActiveTab('aqi')}
            >
              <Text style={[styles.tabText, activeTab === 'aqi' && styles.activeTabText]}>
                Air Quality
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'forecast' && styles.activeTab]}
              onPress={() => setActiveTab('forecast')}
            >
              <Text style={[styles.tabText, activeTab === 'forecast' && styles.activeTabText]}>
                Forecast
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'map' && styles.activeTab]}
              onPress={() => setActiveTab('map')}
            >
              <Text style={[styles.tabText, activeTab === 'map' && styles.activeTabText]}>
                Map
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          weatherData && (
            <>
              {activeTab === 'weather' && <WeatherCard weather={weatherData.weather} aqi={weatherData.aqi} activeTab="weather" />}
              {activeTab === 'aqi' && <WeatherCard weather={weatherData.weather} aqi={weatherData.aqi} activeTab="aqi" />}
              {activeTab === 'forecast' && forecastData && (
                <>
                  <View style={styles.periodSelector}>
                    <TouchableOpacity
                      style={[styles.periodButton, forecastPeriod === '3day' && styles.activePeriod]}
                      onPress={() => setForecastPeriod('3day')}
                    >
                      <Text style={[styles.periodText, forecastPeriod === '3day' && styles.activePeriodText]}>3 Days</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.periodButton, forecastPeriod === '5day' && styles.activePeriod]}
                      onPress={() => setForecastPeriod('5day')}
                    >
                      <Text style={[styles.periodText, forecastPeriod === '5day' && styles.activePeriodText]}>5 Days</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.periodButton, styles.disabledButton]}
                      disabled
                    >
                      <Text style={[styles.periodText, styles.disabledText]}>7 Days</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.periodButton, styles.disabledButton]}
                      disabled
                    >
                      <Text style={[styles.periodText, styles.disabledText]}>10 Days</Text>
                    </TouchableOpacity>
                  </View>
                  <ForecastCard forecast={forecastData} period={forecastPeriod} />
                </>
              )}
              {activeTab === 'map' && weatherData.weather && (
                <WeatherMap
                  city={weatherData.weather.name}
                  coordinates={{
                    lat: weatherData.weather.coord.lat,
                    lon: weatherData.weather.coord.lon
                  }}
                />
              )}
            </>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f6fa',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 5,
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4a90e2',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  loader: {
    marginTop: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    gap: 10,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    minWidth: 80,
    alignItems: 'center',
  },
  activePeriod: {
    backgroundColor: '#4a90e2',
  },
  periodText: {
    color: '#666',
    fontWeight: '600',
  },
  activePeriodText: {
    color: '#fff',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#999',
  },
});

export default App;