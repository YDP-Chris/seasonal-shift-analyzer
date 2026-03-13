export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherApiResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherData[];
  main: MainWeather;
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: MainWeather;
  weather: WeatherData[];
  dt_txt: string;
}

export interface ForecastApiResponse {
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface LocationData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface TrendData {
  date: string;
  temperature: number;
  rollingAverage: number;
}

export interface TransitionAlert {
  type: 'spring' | 'summer' | 'fall' | 'winter';
  confidence: number;
  daysConsecutive: number;
  threshold: number;
  message: string;
  categories: ProductCategory[];
}

export interface ProductCategory {
  name: string;
  recommendation: 'increase' | 'decrease' | 'maintain';
  reasoning: string;
  confidence: number;
}

export interface AnalyticsData {
  trends: TrendData[];
  alerts: TransitionAlert[];
  currentTemp: number;
  rollingAverage: number;
  location: string;
}