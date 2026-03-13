import React from 'react';
import { MapPin, Thermometer, Eye } from 'lucide-react';

interface CurrentWeatherProps {
  location: string;
  temperature: number;
  rollingAverage: number;
  onChangeLocation: () => void;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  location,
  temperature,
  rollingAverage,
  onChangeLocation
}) => {
  const getTempColor = (temp: number) => {
    if (temp >= 80) return 'text-red-600';
    if (temp >= 70) return 'text-orange-600';
    if (temp >= 60) return 'text-yellow-600';
    if (temp >= 50) return 'text-green-600';
    if (temp >= 40) return 'text-blue-600';
    return 'text-purple-600';
  };

  const getTrendIndicator = () => {
    const diff = temperature - rollingAverage;
    if (Math.abs(diff) < 2) return { text: 'stable', color: 'text-gray-600' };
    if (diff > 0) return { text: `+${diff.toFixed(1)}°F vs avg`, color: 'text-red-600' };
    return { text: `${diff.toFixed(1)}°F vs avg`, color: 'text-blue-600' };
  };

  const trend = getTrendIndicator();

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">{location}</h2>
        </div>
        <button
          onClick={onChangeLocation}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Change Location
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Thermometer className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Current</span>
          </div>
          <div className={`text-3xl font-bold ${getTempColor(temperature)}`}>
            {temperature}°F
          </div>
          <div className={`text-sm mt-1 ${trend.color}`}>
            {trend.text}
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">5-Day Average</span>
          </div>
          <div className={`text-3xl font-bold ${getTempColor(rollingAverage)}`}>
            {rollingAverage}°F
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Rolling trend
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm font-medium text-gray-600 mb-2">
            Seasonal Context
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {getSeasonalContext(rollingAverage)}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {getSeasonalDescription(rollingAverage)}
          </div>
        </div>
      </div>
    </div>
  );
};

function getSeasonalContext(temp: number): string {
  if (temp >= 75) return 'Summer Weather';
  if (temp >= 65) return 'Spring/Summer';
  if (temp >= 55) return 'Mild Conditions';
  if (temp >= 40) return 'Fall/Winter';
  return 'Winter Weather';
}

function getSeasonalDescription(temp: number): string {
  if (temp >= 75) return 'Hot weather gear';
  if (temp >= 65) return 'Light layers optimal';
  if (temp >= 55) return 'Transitional period';
  if (temp >= 40) return 'Layer up season';
  return 'Heavy winter gear';
}