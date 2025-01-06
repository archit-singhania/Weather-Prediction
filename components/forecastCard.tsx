import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';

interface ForecastCardProps {
  forecast: any;
  period: '3day' | '5day' | '7day' | '10day';
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, period }) => {
  const getDayData = (list: any[]) => {
    const today = new Date().toISOString().split('T')[0];
    const dayData = list.reduce((acc: any, item: any) => {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toISOString().split('T')[0];

      // Skip today's date
      if (dateStr === today) return acc;

      if (!acc[dateStr]) {
        acc[dateStr] = {
          date: date,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        };
      } else {
        acc[dateStr].temp_min = Math.min(acc[dateStr].temp_min, item.main.temp_min);
        acc[dateStr].temp_max = Math.max(acc[dateStr].temp_max, item.main.temp_max);
      }
      return acc;
    }, {});

    const days = Object.values(dayData);
    const maxAvailableDays = days.length;

    switch (period) {
      case '3day':
        return days.slice(0, Math.min(3, maxAvailableDays));
      case '5day':
        return days.slice(0, Math.min(5, maxAvailableDays));
      case '7day':
        if (maxAvailableDays < 7) {
          Alert.alert(
            'Forecast Limitation',
            `Only ${maxAvailableDays}-day forecast is available.`,
            [{ text: 'OK' }]
          );
        }
        return days.slice(0, Math.min(7, maxAvailableDays));
      case '10day':
        if (maxAvailableDays < 10) {
          Alert.alert(
            'Forecast Limitation',
            `Only ${maxAvailableDays}-day forecast is available.`,
            [{ text: 'OK' }]
          );
        }
        return days.slice(0, Math.min(10, maxAvailableDays));
      default:
        return days;
    }
  };

  const days = getDayData(forecast.list);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {days.map((data: any, index: number) => (
            <View key={index} style={styles.dayCard}>
              <Text style={styles.date}>
                {data.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </Text>
              <Text style={styles.temp}>{Math.round(data.temp_max)}°</Text>
              <Text style={styles.tempMin}>{Math.round(data.temp_min)}°</Text>
              <Text style={styles.description}>{data.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {['7day', '10day'].includes(period) && days.length < parseInt(period) && (
        <Text style={styles.limitMessage}>
          Note: Only {days.length}-day forecast data is available with the current weather service.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#666',
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  tempMin: {
    fontSize: 18,
    color: '#666',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    color: '#666',
  },
  limitMessage: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 10,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
});

export default ForecastCard;
