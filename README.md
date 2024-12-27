# Weather Analysis and Presentation System

## 📋 Overview
This project delivers a robust solution for fetching, analyzing, and presenting real-time weather data using the OpenWeatherMap API. The mobile application provides an intuitive interface built with React Native to ensure a seamless user experience.

---

## ✨ Features
- **Real-time Weather Data:** Fetch details like temperature, humidity, wind speed, and pressure.
- **Air Quality Index (AQI):** Display AQI metrics for selected locations.
- **User-Friendly Interface:** Mobile-friendly design for Android and iOS devices.
- **Search Functionality:** Search weather details by city name or coordinates.

---

## 🛠️ Tech Stack
- **React Native** (Frontend)
  - TypeScript for type safety.
  - Custom reusable components for modular development.
- **OpenWeatherMap API** for weather and AQI data.

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js** (v16.x or higher)
- **npm** or **yarn**
- **React Native CLI** or **Expo CLI**
  
-- 

**Steps:**
  Clone the Repository: <br>
  git clone https://github.com/archit-singhania/Weather-Prediction.git <br>
  cd WeatherForecastApp

**Install Dependencies:**<br>
  npm install<br>
  Setup Environment Variables:<br> 

**Create a .env file in the root directory**:<br> 
  OPENWEATHER_API_KEY=your_api_key_here<br> 

**Start the development server/Metro bundler:**<br> 
  npx react-native start<br> 

**Run on Emulator or Device:**<br> 
  For Android: npm run android<br> 
  For iOS: npm run ios <br>
  
## 🗂️ Project Structure

WeatherForecastApp/<br> 
├── android/               # Android-specific files<br> 
├── ios/                   # iOS-specific files<br> 
├── components/            # Reusable components and services 
<br> │   ├── weatherCard.tsx    # Component to display weather information
<br> │   └── weatherService.ts  # API service for fetching weather data <br>
├── __tests__/             # Unit tests<br> 
├── App.tsx                # Main application entry point<br> 
├── app.json               # Application configuration<br> 
├── index.js               # Entry point for React Native<br> 
├── package.json           # Dependencies and scripts<br> 
├── README.md              # Documentation<br> 
└── tsconfig.json          # TypeScript configuration<br> 

💡 Usage<br> 
Launch the app and search for a city or region to get detailed weather data and AQI. Navigate through the interface to explore the features.
