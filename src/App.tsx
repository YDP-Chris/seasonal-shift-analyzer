import { useState, useEffect } from 'react';
import { Settings, BarChart3 } from 'lucide-react';
import { weatherService } from './services/weatherService';
import { analyticsService } from './services/analyticsService';
import { LocationData, AnalyticsData } from './types';
import { ApiKeySetup } from './components/ApiKeySetup';
import { LocationSearch } from './components/LocationSearch';
import { CurrentWeather } from './components/CurrentWeather';
import { TrendChart } from './components/TrendChart';
import { TransitionAlerts } from './components/TransitionAlerts';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

type AppState = 'setup' | 'location' | 'loading' | 'dashboard' | 'error';

function App() {
  const [state, setState] = useState<AppState>('setup');
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Check if API key is already configured
  useEffect(() => {
    if (weatherService.isConfigured()) {
      const savedLocation = localStorage.getItem('selected_location');
      if (savedLocation) {
        try {
          const location = JSON.parse(savedLocation);
          setSelectedLocation(location);
          setState('loading');
          loadAnalytics(location);
        } catch {
          setState('location');
        }
      } else {
        setState('location');
      }
    } else {
      setState('setup');
    }
  }, []);

  const handleApiKeySet = (apiKey: string) => {
    weatherService.setApiKey(apiKey);
    setState('location');
  };

  const handleLocationSelect = async (location: LocationData) => {
    setSelectedLocation(location);
    localStorage.setItem('selected_location', JSON.stringify(location));
    setState('loading');
    await loadAnalytics(location);
  };

  const loadAnalytics = async (location: LocationData) => {
    try {
      setError(null);

      // Get forecast data for analytics
      const forecastData = await weatherService.getForecast(location.lat, location.lon);

      // Analyze the data
      const analytics = analyticsService.analyzeWeatherData(
        forecastData,
        `${location.name}, ${location.state || location.country}`
      );

      setAnalyticsData(analytics);
      setState('dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
      setState('error');
    }
  };

  const handleRetry = () => {
    if (selectedLocation) {
      setState('loading');
      loadAnalytics(selectedLocation);
    }
  };

  const handleChangeLocation = () => {
    setState('location');
    setAnalyticsData(null);
    setError(null);
  };

  const handleRefresh = () => {
    if (selectedLocation) {
      setState('loading');
      loadAnalytics(selectedLocation);
    }
  };

  const resetApiKey = () => {
    weatherService.setApiKey('');
    localStorage.removeItem('openweather_api_key');
    localStorage.removeItem('selected_location');
    setSelectedLocation(null);
    setAnalyticsData(null);
    setError(null);
    setShowSettings(false);
    setState('setup');
  };

  // Setup state
  if (state === 'setup') {
    return <ApiKeySetup onApiKeySet={handleApiKeySet} />;
  }

  // Loading state
  if (state === 'loading') {
    return <LoadingSpinner message="Analyzing weather patterns..." />;
  }

  // Error state
  if (state === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage error={error!} onRetry={handleRetry} />
          <button
            onClick={handleChangeLocation}
            className="mt-4 w-full btn btn-secondary"
          >
            Change Location
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Seasonal Shift Analyzer
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="btn btn-secondary"
              >
                Refresh
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="btn btn-secondary"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-yellow-900">Settings</h3>
                <p className="text-sm text-yellow-700">
                  API Key: {weatherService.getApiKey()?.slice(0, 8)}...
                </p>
              </div>
              <button
                onClick={resetApiKey}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Reset API Key
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Selection */}
        {state === 'location' && (
          <div className="max-w-2xl mx-auto">
            <div className="card">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Select Location
                </h2>
                <p className="text-gray-600">
                  Choose a location to analyze seasonal weather patterns
                </p>
              </div>
              <LocationSearch onLocationSelect={handleLocationSelect} />
            </div>
          </div>
        )}

        {/* Dashboard */}
        {state === 'dashboard' && analyticsData && (
          <div className="space-y-8">
            {/* Current Weather Overview */}
            <CurrentWeather
              location={analyticsData.location}
              temperature={analyticsData.currentTemp}
              rollingAverage={analyticsData.rollingAverage}
              onChangeLocation={handleChangeLocation}
            />

            {/* Transition Alerts */}
            <TransitionAlerts alerts={analyticsData.alerts} />

            {/* Temperature Trends Chart */}
            <TrendChart data={analyticsData.trends} />

            {/* Analytics Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Analytics Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    {analyticsData.trends.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    Days of forecast data
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning-600 mb-2">
                    {analyticsData.alerts.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    Transition alerts
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success-600 mb-2">
                    {analyticsData.alerts.reduce((max, alert) => Math.max(max, alert.confidence), 0)}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Highest confidence
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
                <p>
                  Analysis based on 5-day weather forecast and rolling temperature averages.
                  Seasonal transition alerts are triggered by sustained temperature patterns
                  that indicate optimal inventory shift timing.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;