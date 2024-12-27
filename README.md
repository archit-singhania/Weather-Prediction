Weather Analysis and Prediction System
📋 Overview
This project delivers a robust solution for fetching, analyzing, and presenting real-time weather data using the OpenWeatherMap API. The system provides an intuitive mobile interface built with React Native for seamless user experience.

✨ Features
Real-time Weather Data: Fetch current weather details like temperature, humidity, and pressure.
Air Quality Index (AQI): Display AQI metrics for specific locations.
Mobile App UI: Optimized for Android and iOS using React Native.
Location Search: Users can search for weather details by city or coordinates.
🛠️ Tech Stack
Frontend:
React Native
TypeScript for type safety.
Axios for API calls.
Custom components for modular UI design.
APIs:
OpenWeatherMap API
Fetch weather and AQI data.
🚀 Setup & Installation
Prerequisites:
Node.js (v16.x or higher)
npm or yarn
React Native CLI or Expo CLI
Steps:
Clone the Repository: <br>

bash
Copy code
git clone https://github.com/archit-singhania/Weather-Prediction.git
cd WeatherForecastApp
Install Dependencies:<br>

bash
Copy code
npm install
Setup Environment Variables:<br> Create a .env file in the root directory:

plaintext
Copy code
OPENWEATHER_API_KEY=your_api_key_here
Run the Application:<br> Start the development server/Metro bundler:

bash
Copy code
npx react-native start
Run on Emulator or Device:

For Android: npm run android
For iOS: npm run ios
🗂️ Project Structure
bash
Copy code
WeatherForecastApp/
├── android/               # Android-specific files
├── ios/                   # iOS-specific files
├── components/            # Reusable components and services
│   ├── weatherCard.tsx    # Component to display weather information
│   └── weatherService.ts  # API service for fetching weather data
├── __tests__/             # Unit tests
├── App.tsx                # Main application entry point
├── app.json               # Application configuration
├── index.js               # Entry point for React Native
├── package.json           # Dependencies and scripts
├── README.md              # Documentation
└── tsconfig.json          # TypeScript configuration
💡 Usage
Launch the app and search for a city or region to get detailed weather data and AQI. Navigate through the interface to explore the features.

Troubleshooting
If you can't get this to work, see the Troubleshooting page.

Learn More
To learn more about React Native, take a look at the following resources:

React Native Website
Getting Started
Learn the Basics
Blog
GitHub Repository
