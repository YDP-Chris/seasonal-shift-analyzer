# Seasonal Shift Analyzer

Analytics dashboard for predicting optimal seasonal inventory transitions based on weather data and temperature trends.

## Features

- **Real-time Weather Integration** - Connect to OpenWeatherMap API for current conditions and 5-day forecasts
- **Temperature Trend Analysis** - Calculate 5-day rolling averages to identify sustained patterns
- **Seasonal Transition Alerts** - Automatically detect spring, summer, fall, and winter transitions with confidence scoring
- **Product Category Guidance** - Get actionable recommendations for Outerwear, Tops, and Bottoms inventory
- **Professional Analytics** - Clean, mobile-first dashboard with interactive charts and data visualization

## Setup Instructions

### 1. Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API Keys in your account dashboard
4. Generate a new API key
5. **Important**: The free tier includes 1,000 calls/day, which is perfect for seasonal analysis

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. First-Time Setup

1. When you first open the app, you'll see the API key setup screen
2. Enter your OpenWeatherMap API key (it's stored locally in your browser)
3. Search for and select your location
4. The dashboard will load with analytics for your area

## How It Works

### Temperature Analysis

The app pulls 5-day forecast data and calculates rolling averages to smooth out daily variations. This helps identify sustained temperature trends rather than temporary weather spikes.

### Seasonal Transition Detection

Transitions are detected using these thresholds:
- **Spring**: 3+ consecutive days with rolling average >65°F
- **Summer**: 3+ consecutive days with rolling average >75°F
- **Fall**: 3+ consecutive days with rolling average <55°F
- **Winter**: 3+ consecutive days with rolling average <40°F

### Confidence Scoring

Each alert includes a confidence score (0-100%) based on:
- Number of consecutive days meeting the threshold
- Strength of the temperature trend
- Historical context for the location

### Product Recommendations

For each detected transition, the app provides specific guidance:
- **Increase** - Boost inventory for this category
- **Decrease** - Reduce inventory for this category
- **Maintain** - Keep current inventory levels

## Technology Stack

- **React 18** - Modern UI framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first styling for responsive design
- **Recharts** - Professional data visualization
- **Vite** - Fast development and build tooling
- **OpenWeatherMap API** - Real weather data source

## Data Storage

- **API Key**: Stored in browser localStorage (never sent to external servers)
- **Location**: Cached in localStorage for faster subsequent loads
- **Weather Data**: Fetched fresh on each analysis (not cached)

## Privacy & Security

- Your API key is stored locally in your browser only
- No user data is collected or transmitted to external services
- All weather API calls are made directly from your browser to OpenWeatherMap

## Deployment

This app is configured for easy deployment on Vercel:

```bash
npm run build
```

The production build will be created in the `dist` directory.

## Use Cases

**For Retail Teams:**
- Plan seasonal inventory transitions with data-driven confidence
- Avoid premature or delayed category shifts
- Optimize stock levels based on weather patterns

**For Apparel Brands:**
- Time product launches with seasonal weather patterns
- Adjust marketing campaigns based on temperature trends
- Make informed decisions about regional inventory distribution

**For E-commerce:**
- Dynamically adjust product recommendations
- Optimize search result rankings by season
- Plan promotional calendars around weather transitions

## API Limits

The free OpenWeatherMap tier includes:
- 1,000 API calls per day
- 5-day weather forecast
- Current weather data
- Location search

This is sufficient for regular seasonal analysis. Premium tiers available for higher-volume usage.

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify your API key is valid and has remaining quota
3. Ensure you have a stable internet connection
4. Try refreshing the data or selecting a different location

Built with ❄️ by Foundry AI