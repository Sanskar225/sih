import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { weatherApi } from '../lib/api';
import WeatherCard from '../components/Weather/WeatherCard';
import { Cloud, Search } from 'lucide-react';
import { WeatherData } from '../types';

const Weather: React.FC = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const weatherMutation = useMutation({
    mutationFn: (location: string) => weatherApi.getCurrent(location),
    onSuccess: (response) => {
      if (response.data) {
        setWeatherData(response.data);
      }
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      weatherMutation.mutate(location.trim());
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Weather Monitoring</h1>
        <p className="text-gray-600">Check weather conditions for power grid zones</p>
      </div>

      {/* Search Form */}
      <div className="card">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter location or zone name..."
                className="input-field pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={weatherMutation.isPending || !location.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {weatherMutation.isPending ? 'Searching...' : 'Get Weather'}
          </button>
        </form>
      </div>

      {/* Weather Data */}
      {weatherData && (
        <div className="max-w-md">
          <WeatherCard weather={weatherData} />
        </div>
      )}

      {weatherMutation.isError && (
        <div className="card border-danger-200 bg-danger-50">
          <div className="flex items-center space-x-2 text-danger-700">
            <Cloud className="w-5 h-5" />
            <span>Failed to fetch weather data. Please try again.</span>
          </div>
        </div>
      )}

      {!weatherData && !weatherMutation.isPending && !weatherMutation.isError && (
        <div className="card text-center py-12">
          <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Enter a location to get weather information</p>
        </div>
      )}
    </div>
  );
};

export default Weather;