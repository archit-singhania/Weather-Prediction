import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { fetchWeatherAndAqi } from './components/weatherService';
import WeatherCard from './components/weatherCard';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'weather' | 'aqi'>('weather');

  const handleFetchData = async (): Promise<void> => {
    if (!city) {
      alert('Please enter a city');
      return;
    }

    setLoading(true);
    setError(false);

   // In the handleFetchData function in App.tsx
   try {
     const response = await fetchWeatherAndAqi(city);

     if (response.error) {
       setError(true);
       alert(response.errorMessage || 'City not found. Please check the spelling and try again.');
     } else {
       setWeatherData({
         weather: response.weather,
         aqi: response.aqi
       });
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
          </View>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          weatherData && (
            <WeatherCard
              weather={weatherData.weather}
              aqi={weatherData.aqi}
              loading={loading}
              error={error}
              activeTab={activeTab}
            />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  }
});

export default App;