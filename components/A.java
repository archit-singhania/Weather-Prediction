import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const WeatherCard = ({ weather, aqi, loading, error }) => {
  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#0000ff" />
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

  const aqiIndex = aqi.list[0].main.aqi;

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{weather.main.temp}°C</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>

      <Text style={styles.aqiTitle}>Air Quality Index (AQI):</Text>
      <Text style={styles.aqi}>{aqiIndex}</Text>

      <Text style={styles.aqiDescription}>
        {aqiIndex === 1
          ? 'Good'
          : aqiIndex === 2
          ? 'Fair'
          : aqiIndex === 3
          ? 'Moderate'
          : aqiIndex === 4
          ? 'Poor'
          : 'Hazardous'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  temp: {
    fontSize: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
  aqiTitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  aqi: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  aqiDescription: {
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WeatherCard;
