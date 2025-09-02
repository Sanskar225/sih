import React from 'react';
import { Alert } from '../../types';
import { AlertTriangle, Clock, MapPin, CheckCircle } from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
  onResolve?: (id: string) => void;
  onView?: (id: string) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onResolve, onView }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'alert-critical';
      case 'HIGH': return 'alert-high';
      case 'MEDIUM': return 'alert-medium';
      case 'LOW': return 'alert-low';
      default: return 'alert-medium';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={`card border-l-4 ${getSeverityColor(alert.severity)}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-semibold text-gray-900">{alert.title}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
              {alert.severity}
            </span>
          </div>
          
          {alert.description && (
            <p className="text-gray-600 mb-3">{alert.description}</p>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDate(alert.detectedAt)}</span>
            </div>
            
            {alert.device && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{alert.device.location}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          {onView && (
            <button
              onClick={() => onView(alert.id)}
              className="btn-secondary text-xs"
            >
              View
            </button>
          )}
          
          {alert.status === 'PENDING' && onResolve && (
            <button
              onClick={() => onResolve(alert.id)}
              className="btn-primary text-xs flex items-center space-x-1"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Resolve</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertCard;