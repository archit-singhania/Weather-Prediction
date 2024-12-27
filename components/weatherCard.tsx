// weatherCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

interface WeatherCardProps {
  weather: {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      description: string;
      main: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
  };
  aqi: {
    list: Array<{
      main: {
        aqi: number;
      };
      components: {
        co: number;
        no2: number;
        o3: number;
        pm2_5: number;
        pm10: number;
        so2: number;
      };
    }>;
  };
  loading?: boolean;
  error?: boolean;
  activeTab: 'weather' | 'aqi';
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, aqi, loading, error, activeTab }) => {
  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <Text style={styles.error}>Error fetching data. Please try again.</Text>
      </View>
    );
  }

  const getAQIInfo = (value: number) => {
    // Using standard AQI breakpoints
    if (value <= 50) return { color: '#4CAF50', text: 'Good' };
    if (value <= 100) return { color: '#FFC107', text: 'Moderate' };
    if (value <= 150) return { color: '#FF9800', text: 'Unhealthy for Sensitive Groups' };
    if (value <= 200) return { color: '#FF5722', text: 'Unhealthy' };
    if (value <= 300) return { color: '#9C27B0', text: 'Very Unhealthy' };
    return { color: '#d32f2f', text: 'Hazardous' };
  };

  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  const rawAQI = aqi.list[0].components;
  const aqiInfo = getAQIInfo(aqi.list[0].main.aqi);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</Text>
        </View>

        {activeTab === 'weather' ? (
          <>
            <View style={styles.mainWeather}>
              <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{weather.weather[0].description}</Text>
                <Text style={styles.minMax}>
                  H: {Math.round(weather.main.temp_max)}° L: {Math.round(weather.main.temp_min)}°
                </Text>
              </View>
            </View>

            <View style={styles.weatherGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Feels Like</Text>
                <Text style={styles.value}>{Math.round(weather.main.feels_like)}°C</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Humidity</Text>
                <Text style={styles.value}>{weather.main.humidity}%</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Wind</Text>
                <Text style={styles.value}>
                  {weather.wind.speed} m/s {getWindDirection(weather.wind.deg)}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Pressure</Text>
                <Text style={styles.value}>{weather.main.pressure} hPa</Text>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.aqiContainer, { backgroundColor: aqiInfo.color + '15' }]}>
              <Text style={[styles.aqiValue, { color: aqiInfo.color }]}>
                {rawAQI.pm2_5.toFixed(1)}
              </Text>
              <Text style={[styles.aqiLabel, { color: aqiInfo.color }]}>
                US AQI
              </Text>
              <Text style={[styles.aqiDescription, { color: aqiInfo.color }]}>
                {aqiInfo.text}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Pollutant Levels</Text>
            <View style={styles.pollutantsGrid}>
              <View style={styles.pollutantItem}>
                <Text style={styles.pollutantLabel}>PM2.5</Text>
                <Text style={styles.pollutantValue}>{rawAQI.pm2_5.toFixed(1)}</Text>
                <Text style={styles.pollutantUnit}>μg/m³</Text>
              </View>
              <View style={styles.pollutantItem}>
                <Text style={styles.pollutantLabel}>PM10</Text>
                <Text style={styles.pollutantValue}>{rawAQI.pm10.toFixed(1)}</Text>
                <Text style={styles.pollutantUnit}>μg/m³</Text>
              </View>
              <View style={styles.pollutantItem}>
                <Text style={styles.pollutantLabel}>O₃</Text>
                <Text style={styles.pollutantValue}>{rawAQI.o3.toFixed(1)}</Text>
                <Text style={styles.pollutantUnit}>μg/m³</Text>
              </View>
              <View style={styles.pollutantItem}>
                <Text style={styles.pollutantLabel}>NO₂</Text>
                <Text style={styles.pollutantValue}>{rawAQI.no2.toFixed(1)}</Text>
                <Text style={styles.pollutantUnit}>μg/m³</Text>
              </View>
              <View style={styles.pollutantItem}>
                <Text style={styles.pollutantLabel}>SO₂</Text>
                <Text style={styles.pollutantValue}>{rawAQI.so2.toFixed(1)}</Text>
                <Text style={styles.pollutantUnit}>μg/m³</Text>
              </View>
              <View style={styles.pollutantItem}>
                <Text style={styles.pollutantLabel}>CO</Text>
                <Text style={styles.pollutantValue}>{(rawAQI.co / 1000).toFixed(1)}</Text>
                <Text style={styles.pollutantUnit}>mg/m³</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContainer: {
    marginBottom: 20,
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
  mainWeather: {
    alignItems: 'center',
    marginBottom: 30,
  },
  temp: {
    fontSize: 72,
    fontWeight: '200',
    color: '#4a90e2',
    marginBottom: 10,
  },
  descriptionContainer: {
    alignItems: 'center',
  },
  description: {
    fontSize: 24,
    color: '#666',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  minMax: {
    fontSize: 16,
    color: '#666',
  },
  weatherGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  aqiContainer: {
    alignItems: 'center',
    padding: 25,
    borderRadius: 20,
    marginVertical: 20,
  },
  aqiValue: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  aqiLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
  },
  aqiDescription: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a237e',
    marginVertical: 20,
  },
  pollutantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pollutantItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
  },
  pollutantLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  pollutantValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  pollutantUnit: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  error: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WeatherCard;