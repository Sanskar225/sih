import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Shield, Bell, Database } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <User className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">User Profile</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="input-field"
                value={user?.name || ''}
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="input-field"
                value={user?.email || ''}
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                className="input-field"
                value={user?.role || ''}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          </div>
          
          <div className="space-y-4">
            <button className="w-full btn-secondary text-left">
              Change Password
            </button>
            
            <button className="w-full btn-secondary text-left">
              Two-Factor Authentication
            </button>
            
            <button className="w-full btn-secondary text-left">
              Session Management
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Critical Alerts</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Device Status Changes</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Weekly Reports</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">System</h3>
          </div>
          
          <div className="space-y-4">
            <button className="w-full btn-secondary text-left">
              Export Data
            </button>
            
            <button className="w-full btn-secondary text-left">
              System Backup
            </button>
            
            <button className="w-full btn-danger text-left">
              Reset System
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;