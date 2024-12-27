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
1. **Clone the Repository:** <br>
  git clone [https://github.com/yourusername/weather-analysis-system.git](https://github.com/archit-singhania/Weather-Prediction.git) <br>
  cd WeatherForecastApp

2. **Install Dependencies:**<br>
  npm install

3. **Setup Environment Variables:** <br>
  Create a .env file in the root directory:<br>
  OPENWEATHER_API_KEY=your_api_key_here

4. **Run the Application:**<br>
  Start the development server/metro bundler:<br>
  npx react-native start

6. Use an emulator or a physical device to run the app.<br>
   
🗂️ Project Structure <br>

  WeatherForecastApp/<br>
  ├── android/           # Android-specific files<br>
  ├── ios/               # iOS-specific files<br>
  ├── components/        # Reusable components and services
  <br>│  <div> ├── A.java         # Placeholder or Android integration
  <br>│  <div> ├── weatherCard.tsx # Component to display weather information
  <br>│  <div> └── weatherService.ts # API service for fetching weather data<br>
  ├── __tests__/         # Unit tests<br>
  ├── App.tsx            # Main application entry point<br>
  ├── app.json           # Application configuration<br>
  ├── index.js           # Entry point for React Native<br>
  ├── package.json       # Dependencies and scripts<br>
  ├── README.md          # Documentation<br>
  └── tsconfig.json      # TypeScript configuration <br>

💡 Usage<br>

Launch the app and search for a city or region to get detailed weather data and AQI.<br>
Navigate through the interface to explore the features.
