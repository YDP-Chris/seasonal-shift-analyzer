import React, { useState } from 'react';
import { Search, MapPin, Loader } from 'lucide-react';
import { LocationData } from '../types';
import { weatherService } from '../services/weatherService';

interface LocationSearchProps {
  onLocationSelect: (location: LocationData) => void;
  disabled?: boolean;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect, disabled }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const locations = await weatherService.searchLocations(query);
      setResults(locations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLocationClick = (location: LocationData) => {
    onLocationSelect(location);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled || loading}
            className="input pl-10 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={disabled || loading || !query.trim()}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-6"
        >
          {loading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            'Search'
          )}
        </button>
      </div>

      {error && (
        <div className="mt-2 p-3 bg-alert-50 border border-alert-200 rounded-lg text-alert-700">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
          {results.map((location, index) => (
            <button
              key={index}
              onClick={() => handleLocationClick(location)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
            >
              <MapPin className="w-4 h-4 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">
                  {location.name}
                </div>
                <div className="text-sm text-gray-500">
                  {location.state && `${location.state}, `}{location.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};