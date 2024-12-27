**Weather Analysis and Prediction System
📋 Overview**
This project delivers a robust solution for fetching, analyzing, and presenting real-time weather data using the OpenWeatherMap API. The system provides an intuitive mobile interface built with React Native for seamless user experience.

**✨ Features**
Real-time Weather Data: Fetch current weather details like temperature, humidity, and pressure.
Air Quality Index (AQI): Display AQI metrics for specific locations.
Mobile App UI: Optimized for Android and iOS using React Native.
Location Search: Users can search for weather details by city or coordinates.

**🛠️ Tech Stack**
1. Frontend:
  React Native
  TypeScript for type safety.
  Axios for API calls.
  Custom components for modular UI design.
2. APIs:
  OpenWeatherMap API
  Fetch weather and AQI data.

**🚀 Setup & Installation**
Prerequisites:
  Node.js (v16.x or higher)
  npm or yarn
  React Native CLI or Expo CLI
  Steps:
    Clone the Repository: <br>
    git clone https://github.com/archit-singhania/Weather-Prediction.git
    cd WeatherForecastApp

Install Dependencies:<br>
  npm install
  Setup Environment Variables:<br> 

Create a .env file in the root directory:<br> 
  OPENWEATHER_API_KEY=your_api_key_here<br> 
  Run the Application:<br> 

Start the development server/Metro bundler:<br> 
  npx react-native start<br> 

Run on Emulator or Device:<br> 
  For Android: npm run android<br> 
  For iOS: npm run ios
  
🗂️ Project Structure

WeatherForecastApp/<br> 
├── android/               # Android-specific files<br> 
├── ios/                   # iOS-specific files<br> 
├── components/            # Reusable components and services<br> 
<br> │   ├── weatherCard.tsx    # Component to display weather information
<br> │   └── weatherService.ts  # API service for fetching weather data
├── __tests__/             # Unit tests<br> 
├── App.tsx                # Main application entry point<br> 
├── app.json               # Application configuration<br> 
├── index.js               # Entry point for React Native<br> 
├── package.json           # Dependencies and scripts<br> 
├── README.md              # Documentation<br> 
└── tsconfig.json          # TypeScript configuration<br> 

💡 Usage<br> 
Launch the app and search for a city or region to get detailed weather data and AQI. Navigate through the interface to explore the features.
