import { WeatherApiResponse, ForecastApiResponse, LocationData } from '../types';

class WeatherService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';
  private geoUrl = 'https://api.openweathermap.org/geo/1.0';

  constructor() {
    this.apiKey = localStorage.getItem('openweather_api_key');
  }

  setApiKey(key: string): void {
    this.apiKey = key;
    localStorage.setItem('openweather_api_key', key);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async searchLocations(query: string): Promise<LocationData[]> {
    if (!this.apiKey) {
      throw new Error('API key not configured');
    }

    const response = await fetch(
      `${this.geoUrl}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${this.apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Location search failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherApiResponse> {
    if (!this.apiKey) {
      throw new Error('API key not configured');
    }

    const response = await fetch(
      `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`
    );

    if (!response.ok) {
      throw new Error(`Weather API failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getForecast(lat: number, lon: number): Promise<ForecastApiResponse> {
    if (!this.apiKey) {
      throw new Error('API key not configured');
    }

    const response = await fetch(
      `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`
    );

    if (!response.ok) {
      throw new Error(`Forecast API failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getHistoricalForecast(lat: number, lon: number): Promise<ForecastApiResponse> {
    // Note: OpenWeatherMap's free tier doesn't include historical data
    // For demo purposes, we'll use the forecast API which gives us 5 days ahead
    return this.getForecast(lat, lon);
  }
}

export const weatherService = new WeatherService();