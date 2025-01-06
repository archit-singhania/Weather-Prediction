import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView, PanResponder, GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WeatherMapProps {
  city?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

const MAP_LAYERS = {
  temp_new: {
    name: 'Temperature',
    legend: [
      { color: '#91002C', label: '>35°C' },
      { color: '#D35225', label: '30-35°C' },
      { color: '#FF7A1F', label: '25-30°C' },
      { color: '#FFA20C', label: '20-25°C' },
      { color: '#FFD800', label: '15-20°C' },
      { color: '#C1E955', label: '10-15°C' },
      { color: '#6AD15A', label: '5-10°C' },
      { color: '#28A769', label: '0-5°C' },
      { color: '#207A89', label: '<0°C' },
    ]
  },
  precipitation_new: {
    name: 'Precipitation',
    legend: [
      { color: '#241B4C', label: '>50 mm' },
      { color: '#1B4C88', label: '20-50 mm' },
      { color: '#3375B5', label: '10-20 mm' },
      { color: '#42A0DD', label: '5-10 mm' },
      { color: '#66CCFF', label: '2-5 mm' },
      { color: '#99DDFF', label: '1-2 mm' },
      { color: '#CCFFFF', label: '<1 mm' },
    ]
  },
  clouds_new: {
    name: 'Clouds',
    legend: [
      { color: '#FFFFFF', label: '0-10%' },
      { color: '#E6E6E6', label: '10-30%' },
      { color: '#CCCCCC', label: '30-50%' },
      { color: '#B3B3B3', label: '50-70%' },
      { color: '#999999', label: '70-90%' },
      { color: '#808080', label: '90-100%' },
    ]
  },
  pressure_new: {
    name: 'Pressure',
    legend: [
      { color: '#8C3B3B', label: '>1050 hPa' },
      { color: '#BC5F5F', label: '1030-1050 hPa' },
      { color: '#D68B8B', label: '1020-1030 hPa' },
      { color: '#E6BABA', label: '1010-1020 hPa' },
      { color: '#BAE6E6', label: '1000-1010 hPa' },
      { color: '#8BD6D6', label: '990-1000 hPa' },
      { color: '#5FBCBC', label: '970-990 hPa' },
      { color: '#3B8C8C', label: '<970 hPa' },
    ]
  },
  wind_new: {
    name: 'Wind Speed',
    legend: [
      { color: '#D14124', label: '>30 m/s' },
      { color: '#E67325', label: '25-30 m/s' },
      { color: '#F29135', label: '20-25 m/s' },
      { color: '#F9AE45', label: '15-20 m/s' },
      { color: '#FCC855', label: '10-15 m/s' },
      { color: '#FFE165', label: '5-10 m/s' },
      { color: '#FFFF75', label: '<5 m/s' },
    ]
  },
};

const WeatherMap: React.FC<WeatherMapProps> = ({ city, coordinates }) => {
  const [activeLayer, setActiveLayer] = useState('temp_new');
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState({ x: 16, y: 10 });
  const [showLegend, setShowLegend] = useState(false);
  const API_KEY = '380641d202faba1ced587eef1b25c004';

  useEffect(() => {
    if (coordinates) {
      // Convert lat/lon to tile coordinates
      const lat = coordinates.lat;
      const lon = coordinates.lon;
      const x = Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
      const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
      setCenter({ x, y });
    }
  }, [coordinates, zoom]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event: GestureResponderEvent, gestureState: any) => {
      // Calculate new center based on pan gesture
      const dx = gestureState.dx / 100;
      const dy = gestureState.dy / 100;
      setCenter(prev => ({
        x: prev.x - dx,
        y: prev.y - dy
      }));
    },
  });

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev + 1 : prev - 1;
      return Math.max(3, Math.min(8, newZoom)); // Limit zoom levels between 3 and 8
    });
  };

  const mapUrl = `https://tile.openweathermap.org/map/${activeLayer}/${zoom}/${Math.floor(center.x)}/${Math.floor(center.y)}.png?appid=${API_KEY}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather Map {city ? `- ${city}` : ''}</Text>
      </View>

      <View style={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.layerSelector}>
          <View style={styles.layerButtonContainer}>
            {Object.entries(MAP_LAYERS).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  setActiveLayer(key);
                  setShowLegend(true);
                }}
                style={[
                  styles.layerButton,
                  activeLayer === key && styles.activeLayerButton,
                ]}
              >
                <Text
                  style={[
                    styles.layerButtonText,
                    activeLayer === key && styles.activeLayerButtonText,
                  ]}
                >
                  {value.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.mapContainer} {...panResponder.panHandlers}>
          <Image
            source={{ uri: mapUrl }}
            style={styles.map}
            resizeMode="cover"
          />

          {/* Zoom controls */}
          <View style={styles.zoomControls}>
            <TouchableOpacity
              style={styles.zoomButton}
              onPress={() => handleZoom('in')}
            >
              <Text style={styles.zoomButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.zoomButton}
              onPress={() => handleZoom('out')}
            >
              <Text style={styles.zoomButtonText}>-</Text>
            </TouchableOpacity>
          </View>

          {/* Legend toggle button */}
          <TouchableOpacity
            style={styles.legendToggle}
            onPress={() => setShowLegend(!showLegend)}
          >
            <Text style={styles.legendToggleText}>
              {showLegend ? 'Hide Legend' : 'Show Legend'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Legend */}
        {showLegend && (
          <View style={styles.legend}>
            <Text style={styles.legendTitle}>{MAP_LAYERS[activeLayer as keyof typeof MAP_LAYERS].name} Legend</Text>
            {MAP_LAYERS[activeLayer as keyof typeof MAP_LAYERS].legend.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.attribution}>
          Map data © OpenWeatherMap
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  layerSelector: {
    marginBottom: 15,
  },
  layerButtonContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    gap: 10,
  },
  layerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  activeLayerButton: {
    backgroundColor: '#4a90e2',
  },
  layerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeLayerButtonText: {
    color: '#fff',
  },
  mapContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  zoomControls: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 5,
  },
  zoomButton: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  zoomButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  legendToggle: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 8,
  },
  legendToggleText: {
    fontSize: 12,
    color: '#4a90e2',
    fontWeight: '600',
  },
  legend: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  legendLabel: {
    fontSize: 12,
    color: '#666',
  },
  attribution: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default WeatherMap;