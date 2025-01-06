import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

// AQI breakpoint tables for each pollutant
const PM25_BREAKPOINTS = [
  { bpLo: 0, bpHi: 12.0, iLo: 0, iHi: 50 },
  { bpLo: 12.1, bpHi: 35.4, iLo: 51, iHi: 100 },
  { bpLo: 35.5, bpHi: 55.4, iLo: 101, iHi: 150 },
  { bpLo: 55.5, bpHi: 150.4, iLo: 151, iHi: 200 },
  { bpLo: 150.5, bpHi: 250.4, iLo: 201, iHi: 300 },
  { bpLo: 250.5, bpHi: 500.4, iLo: 301, iHi: 500 },
];

const PM10_BREAKPOINTS = [
  { bpLo: 0, bpHi: 54, iLo: 0, iHi: 50 },
  { bpLo: 55, bpHi: 154, iLo: 51, iHi: 100 },
  { bpLo: 155, bpHi: 254, iLo: 101, iHi: 150 },
  { bpLo: 255, bpHi: 354, iLo: 151, iHi: 200 },
  { bpLo: 355, bpHi: 424, iLo: 201, iHi: 300 },
  { bpLo: 425, bpHi: 604, iLo: 301, iHi: 500 },
];

const O3_BREAKPOINTS = [
  { bpLo: 0, bpHi: 54, iLo: 0, iHi: 50 },
  { bpLo: 55, bpHi: 70, iLo: 51, iHi: 100 },
  { bpLo: 71, bpHi: 85, iLo: 101, iHi: 150 },
  { bpLo: 86, bpHi: 105, iLo: 151, iHi: 200 },
  { bpLo: 106, bpHi: 200, iLo: 201, iHi: 300 },
  { bpLo: 201, bpHi: 504, iLo: 301, iHi: 500 },
];

const NO2_BREAKPOINTS = [
  { bpLo: 0, bpHi: 53, iLo: 0, iHi: 50 },
  { bpLo: 54, bpHi: 100, iLo: 51, iHi: 100 },
  { bpLo: 101, bpHi: 360, iLo: 101, iHi: 150 },
  { bpLo: 361, bpHi: 649, iLo: 151, iHi: 200 },
  { bpLo: 650, bpHi: 1249, iLo: 201, iHi: 300 },
  { bpLo: 1250, bpHi: 2049, iLo: 301, iHi: 500 },
];

const SO2_BREAKPOINTS = [
  { bpLo: 0, bpHi: 35, iLo: 0, iHi: 50 },
  { bpLo: 36, bpHi: 75, iLo: 51, iHi: 100 },
  { bpLo: 76, bpHi: 185, iLo: 101, iHi: 150 },
  { bpLo: 186, bpHi: 304, iLo: 151, iHi: 200 },
  { bpLo: 305, bpHi: 604, iLo: 201, iHi: 300 },
  { bpLo: 605, bpHi: 1004, iLo: 301, iHi: 500 },
];

const CO_BREAKPOINTS = [
  { bpLo: 0, bpHi: 4.4, iLo: 0, iHi: 50 },
  { bpLo: 4.5, bpHi: 9.4, iLo: 51, iHi: 100 },
  { bpLo: 9.5, bpHi: 12.4, iLo: 101, iHi: 150 },
  { bpLo: 12.5, bpHi: 15.4, iLo: 151, iHi: 200 },
  { bpLo: 15.5, bpHi: 30.4, iLo: 201, iHi: 300 },
  { bpLo: 30.5, bpHi: 50.4, iLo: 301, iHi: 500 },
];

// Helper function for pollutant AQI calculation
const calculatePollutantAQI = (concentration: number, breakpoints: typeof PM25_BREAKPOINTS) => {
  // Handle negative or zero concentration
  if (concentration <= 0) return 0;

  // Clamp the concentration to the maximum value in the breakpoint table
  const maxConcentration = breakpoints[breakpoints.length - 1].bpHi;
  const clampedConcentration = Math.min(concentration, maxConcentration);

  // Find the appropriate breakpoint range
  for (let i = 0; i < breakpoints.length; i++) {
    const { bpLo, bpHi, iLo, iHi } = breakpoints[i];

    if (clampedConcentration >= bpLo && clampedConcentration <= bpHi) {
      // Calculate AQI using the formula
      const aqi = ((iHi - iLo) / (bpHi - bpLo)) * (clampedConcentration - bpLo) + iLo;
      return Math.round(Math.min(aqi, 500)); // Ensure AQI never exceeds 500
    }
  }

  // If concentration is below lowest breakpoint, use the first range
  const firstBreakpoint = breakpoints[0];
  const aqi = ((firstBreakpoint.iHi - firstBreakpoint.iLo) /
    (firstBreakpoint.bpHi - firstBreakpoint.bpLo)) *
    (clampedConcentration - firstBreakpoint.bpLo) + firstBreakpoint.iLo;

  return Math.round(Math.min(aqi, 500));
};

// Main AQI calculation logic with validation
const calculateAQI = (components: {
  pm2_5: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
}) => {
  // Validate and convert units if necessary
  // CO comes in μg/m3, need to convert to mg/m3
  const coInMgM3 = components.co / 1000;

  const aqiValues = {
    pm2_5: calculatePollutantAQI(components.pm2_5, PM25_BREAKPOINTS),
    pm10: calculatePollutantAQI(components.pm10, PM10_BREAKPOINTS),
    o3: calculatePollutantAQI(components.o3, O3_BREAKPOINTS),
    no2: calculatePollutantAQI(components.no2, NO2_BREAKPOINTS),
    so2: calculatePollutantAQI(components.so2, SO2_BREAKPOINTS),
    co: calculatePollutantAQI(coInMgM3, CO_BREAKPOINTS),
  };

  // Ensure no individual AQI exceeds 500
  Object.keys(aqiValues).forEach(key => {
    aqiValues[key as keyof typeof aqiValues] = Math.min(aqiValues[key as keyof typeof aqiValues], 500);
  });

  // Overall AQI is the highest of the individual pollutant AQIs
  const maxAqi = Math.max(...Object.values(aqiValues));

  return {
    aqi: Math.min(maxAqi, 500), // Final safety check to ensure AQI never exceeds 500
    pollutantValues: aqiValues,
  };
};

// React Component
interface WeatherCardProps {
  weather?: {
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
  aqi?: {
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

  if (error || !weather || (activeTab === 'aqi' && !aqi?.list?.[0])) {
    return (
      <View style={styles.card}>
        <Text style={styles.error}>
          {error ? 'Error fetching data. Please try again.' : 'No data available'}
        </Text>
      </View>
    );
  }

  const getAQIInfo = (value: number) => {
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

    // Only calculate AQI if we have the data
    let calculatedAQI = { aqi: 0, pollutantValues: {} };
    let aqiInfo = { color: '#666', text: 'No Data' };

    if (aqi?.list?.[0]?.components) {
        const rawAQI = aqi.list[0].components;
        calculatedAQI = calculateAQI(rawAQI);
        const dominantAQI = calculatedAQI.aqi;
        aqiInfo = getAQIInfo(dominantAQI);
    }

  return (
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.headerContainer}>
            <Text style={styles.city}>{weather.name}</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
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
            aqi?.list?.[0]?.components ? (
              <>
                <View style={[styles.aqiContainer, { backgroundColor: aqiInfo.color + '15' }]}>
                  <Text style={[styles.aqiValue, { color: aqiInfo.color }]}>{calculatedAQI.aqi}</Text>
                  <Text style={[styles.aqiLabel, { color: aqiInfo.color }]}>US AQI</Text>
                  <Text style={[styles.aqiDescription, { color: aqiInfo.color }]}>{aqiInfo.text}</Text>
                </View>

                <Text style={styles.sectionTitle}>Pollutant Levels</Text>
                <View style={styles.pollutantsGrid}>
                  {Object.entries(calculatedAQI.pollutantValues).map(([pollutant, aqiValue]) => {
                    const components = aqi.list[0].components;
                    const rawValue = components[pollutant as keyof PollutantComponents];
                    const displayValue = pollutant === 'co' ? (rawValue / 1000).toFixed(1) : rawValue.toFixed(1);
                    const unit = pollutant === 'co' ? 'mg/m³' : 'μg/m³';
                    const label = {
                      pm2_5: 'PM2.5',
                      pm10: 'PM10',
                      o3: 'O₃',
                      no2: 'NO₂',
                      so2: 'SO₂',
                      co: 'CO',
                    }[pollutant];

                    return (
                      <View key={pollutant} style={styles.pollutantItem}>
                        <Text style={styles.pollutantLabel}>{label}</Text>
                        <Text style={styles.pollutantValue}>{displayValue}</Text>
                        <Text style={styles.pollutantUnit}>{unit}</Text>
                        <Text style={[styles.pollutantAqi, { color: getAQIInfo(aqiValue).color }]}>
                          AQI: {aqiValue}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </>
            ) : (
              <View style={styles.card}>
                <Text style={styles.error}>No air quality data available</Text>
              </View>
            )
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
  pollutantAqi: {
    fontSize: 14,
    color: '#4a90e2',
    marginTop: 5,
    fontWeight: '600',
  },
  error: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WeatherCard;