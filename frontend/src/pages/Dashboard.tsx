import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { alertsApi, devicesApi } from '../lib/api';
import StatsCard from '../components/Dashboard/StatsCard';
import AlertCard from '../components/Alerts/AlertCard';
import { AlertTriangle, Cpu, CheckCircle, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { data: alertsResponse } = useQuery({
    queryKey: ['alerts'],
    queryFn: alertsApi.getAll,
  });

  const { data: devices } = useQuery({
    queryKey: ['devices'],
    queryFn: devicesApi.getAll,
  });

  const alerts = alertsResponse?.data || [];
  const criticalAlerts = alerts.filter(alert => alert.severity === 'CRITICAL' && alert.status === 'PENDING');
  const pendingAlerts = alerts.filter(alert => alert.status === 'PENDING');
  const resolvedAlerts = alerts.filter(alert => alert.status === 'RESOLVED');
  const onlineDevices = devices?.filter(device => device.status === 'ONLINE') || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Power grid monitoring system overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Critical Alerts"
          value={criticalAlerts.length}
          icon={AlertTriangle}
          color="danger"
        />
        <StatsCard
          title="Pending Alerts"
          value={pendingAlerts.length}
          icon={Clock}
          color="warning"
        />
        <StatsCard
          title="Resolved Today"
          value={resolvedAlerts.length}
          icon={CheckCircle}
          color="success"
        />
        <StatsCard
          title="Online Devices"
          value={onlineDevices.length}
          icon={Cpu}
          color="primary"
        />
      </div>

      {/* Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Critical Alerts</h2>
          <div className="space-y-4">
            {criticalAlerts.slice(0, 5).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
            {criticalAlerts.length === 0 && (
              <div className="card text-center py-8">
                <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-3" />
                <p className="text-gray-600">No critical alerts at this time</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-medium text-gray-900 mb-3">Device Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Online Devices</span>
                  <span className="font-medium text-success-600">{onlineDevices.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Offline Devices</span>
                  <span className="font-medium text-danger-600">
                    {(devices?.length || 0) - onlineDevices.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Devices</span>
                  <span className="font-medium text-gray-900">{devices?.length || 0}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-medium text-gray-900 mb-3">Alert Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Alerts</span>
                  <span className="font-medium text-gray-900">{alerts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="font-medium text-warning-600">{pendingAlerts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Resolved</span>
                  <span className="font-medium text-success-600">{resolvedAlerts.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;