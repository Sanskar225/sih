import React from 'react';
import { WeatherData } from '../../types';
import { Cloud, Thermometer, Droplets, Wind } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Cloud className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{weather.zone}</h3>
            <p className="text-sm text-gray-500">{weather.conditions}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Thermometer className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{weather.temperature}°C</p>
          <p className="text-xs text-gray-500">Temperature</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Droplets className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{weather.humidity}%</p>
          <p className="text-xs text-gray-500">Humidity</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Wind className="w-4 h-4 text-gray-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{weather.windSpeed}</p>
          <p className="text-xs text-gray-500">Wind (m/s)</p>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        Recorded: {formatDate(weather.recordedAt)}
      </div>
    </div>
  );
};

export default WeatherCard;