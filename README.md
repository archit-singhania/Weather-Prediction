# Weather Analysis and Prediction System

## 📋 Overview
This project delivers a robust solution for fetching, analyzing, and presenting real-time weather data using the OpenWeatherMap API. The system provides an intuitive mobile interface built with React Native for seamless user experience.

---

## ✨ Features
- **Real-time Weather Data:** Fetch current weather details like temperature, humidity, and pressure.
- **Air Quality Index (AQI):** Display AQI metrics for specific locations.
- **Mobile App UI:** Optimized for Android and iOS using React Native.
- **Location Search:** Users can search for weather details by city or coordinates.

---

## 🛠️ Tech Stack
### Frontend:
- **React Native**
  - TypeScript for type safety.
  - Axios for API calls.
  - Custom components for modular UI design.

### APIs:
- **OpenWeatherMap API**
  - Fetch weather and AQI data.

---

## 🚀 Setup & Installation

### Prerequisites:
- **Node.js** (v16.x or higher)
- **npm** or **yarn**
- **React Native CLI** or **Expo CLI**

### Steps:
1. **Clone the Repository:**
  git clone [https://github.com/yourusername/weather-analysis-system.git](https://github.com/archit-singhania/Weather-Prediction.git)
  cd WeatherForecastApp

2. **Install Dependencies:**
  npm install

3. **Setup Environment Variables:**
  Create a .env file in the root directory:
  OPENWEATHER_API_KEY=your_api_key_here

4. **Run the Application:**
  Start the development server/metro bundler:
  npx react-native start

5. Use an emulator or a physical device to run the app.
   
🗂️ Project Structure

WeatherForecastApp/
├── android/           # Android-specific files
├── ios/               # iOS-specific files
├── components/        # Reusable components and services
│   ├── A.java         # Placeholder or Android integration
│   ├── weatherCard.tsx # Component to display weather information
│   └── weatherService.ts # API service for fetching weather data
├── __tests__/         # Unit tests
├── App.tsx            # Main application entry point
├── app.json           # Application configuration
├── index.js           # Entry point for React Native
├── package.json       # Dependencies and scripts
├── README.md          # Documentation
└── tsconfig.json      # TypeScript configuration 

💡 Usage
Launch the app and search for a city or region to get detailed weather data and AQI.
Navigate through the interface to explore the features.
