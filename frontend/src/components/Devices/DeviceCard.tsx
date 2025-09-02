import React from 'react';
import { Device } from '../../types';
import { Cpu, MapPin, Wifi, WifiOff, Thermometer, Zap } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  onView?: (id: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onView }) => {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'VOLTAGE_SENSOR': return Zap;
      case 'TEMPERATURE_SENSOR': return Thermometer;
      default: return Cpu;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ONLINE': return 'text-success-600 bg-success-50';
      case 'OFFLINE': return 'text-danger-600 bg-danger-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const DeviceIcon = getDeviceIcon(device.type);

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <DeviceIcon className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{device.name}</h3>
            <p className="text-sm text-gray-500">{device.deviceId}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {device.status === 'ONLINE' ? (
            <Wifi className="w-4 h-4 text-success-600" />
          ) : (
            <WifiOff className="w-4 h-4 text-danger-600" />
          )}
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(device.status)}`}>
            {device.status}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{device.location}</span>
        </div>
        
        <div className="text-sm text-gray-500">
          Type: {device.type.replace('_', ' ')}
        </div>
        
        {device.lastSeen && (
          <div className="text-sm text-gray-500">
            Last seen: {new Date(device.lastSeen).toLocaleString()}
          </div>
        )}
      </div>
      
      {device.alerts && device.alerts.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-warning-600" />
            <span className="text-warning-600 font-medium">
              {device.alerts.length} active alert{device.alerts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
      
      {onView && (
        <button
          onClick={() => onView(device.id)}
          className="w-full btn-secondary text-sm"
        >
          View Details
        </button>
      )}
    </div>
  );
};

export default DeviceCard;