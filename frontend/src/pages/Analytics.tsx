import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { alertsApi, devicesApi } from '../lib/api';
import { BarChart3, TrendingUp, Activity, Zap } from 'lucide-react';

const Analytics: React.FC = () => {
  const { data: alertsResponse } = useQuery({
    queryKey: ['alerts'],
    queryFn: alertsApi.getAll,
  });

  const { data: devices } = useQuery({
    queryKey: ['devices'],
    queryFn: devicesApi.getAll,
  });

  const alerts = alertsResponse?.data || [];
  
  // Calculate analytics
  const totalAlerts = alerts.length;
  const criticalAlerts = alerts.filter(a => a.severity === 'CRITICAL').length;
  const resolvedAlerts = alerts.filter(a => a.status === 'RESOLVED').length;
  const resolutionRate = totalAlerts > 0 ? Math.round((resolvedAlerts / totalAlerts) * 100) : 0;
  
  const onlineDevices = devices?.filter(d => d.status === 'ONLINE').length || 0;
  const totalDevices = devices?.length || 0;
  const deviceUptime = totalDevices > 0 ? Math.round((onlineDevices / totalDevices) * 100) : 0;

  // Severity distribution
  const severityStats = {
    CRITICAL: alerts.filter(a => a.severity === 'CRITICAL').length,
    HIGH: alerts.filter(a => a.severity === 'HIGH').length,
    MEDIUM: alerts.filter(a => a.severity === 'MEDIUM').length,
    LOW: alerts.filter(a => a.severity === 'LOW').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">System performance and alert analytics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
              <p className="text-2xl font-bold text-gray-900">{resolutionRate}%</p>
            </div>
            <div className="p-3 bg-success-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Device Uptime</p>
              <p className="text-2xl font-bold text-gray-900">{deviceUptime}%</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <Activity className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{criticalAlerts}</p>
            </div>
            <div className="p-3 bg-danger-50 rounded-lg">
              <Zap className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{totalAlerts}</p>
            </div>
            <div className="p-3 bg-warning-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Severity Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Severity Distribution</h3>
          <div className="space-y-3">
            {Object.entries(severityStats).map(([severity, count]) => {
              const percentage = totalAlerts > 0 ? Math.round((count / totalAlerts) * 100) : 0;
              const colorClass = {
                CRITICAL: 'bg-danger-500',
                HIGH: 'bg-warning-500',
                MEDIUM: 'bg-yellow-500',
                LOW: 'bg-success-500',
              }[severity];
              
              return (
                <div key={severity} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
                    <span className="text-sm font-medium text-gray-700">{severity}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colorClass}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Device Status Overview */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Status Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-success-50 rounded-lg">
              <span className="text-sm font-medium text-success-700">Online Devices</span>
              <span className="text-lg font-bold text-success-700">{onlineDevices}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-danger-50 rounded-lg">
              <span className="text-sm font-medium text-danger-700">Offline Devices</span>
              <span className="text-lg font-bold text-danger-700">{totalDevices - onlineDevices}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Total Devices</span>
              <span className="text-lg font-bold text-gray-700">{totalDevices}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trends */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">{deviceUptime}%</div>
            <p className="text-sm text-gray-600">Average Device Uptime</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-success-600 mb-2">{resolutionRate}%</div>
            <p className="text-sm text-gray-600">Alert Resolution Rate</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-warning-600 mb-2">
              {totalAlerts > 0 ? Math.round((criticalAlerts / totalAlerts) * 100) : 0}%
            </div>
            <p className="text-sm text-gray-600">Critical Alert Ratio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;