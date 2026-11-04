# Guess the Movie - React Web App

A movie guessing game converted from React Native to React web application.

## Features

- Interactive movie guessing game with hints
- Score tracking and statistics
- Local storage for persistent data
- Responsive design with gradient backgrounds
- Integration with Google Gemini (via Vercel serverless proxy) for movie generation

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Add your Gemini API key to the `.env` file:
   ```
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Conversion Notes

This application was converted from React Native to React web app with the following changes:

- **Navigation**: React Navigation → React Router DOM
- **Styling**: React Native StyleSheet → Styled Components
- **Storage**: AsyncStorage → localStorage
- **Components**: React Native components → HTML/React web components
- **Fonts**: Expo Google Fonts → Google Fonts via CDN
- **Images**: Static imports for web compatibility

## Technologies Used

- React 18
- React Router DOM
- Styled Components
- Axios (for API calls)
- Google Gemini API

## Game Rules

- Guess the movie based on hints
- Start with the most challenging hint, get easier hints as you progress
- Score: 30 points minus 5 points per hint used
- You have 3 guesses per movie
- Stats are saved locally in your browser