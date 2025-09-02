export interface User {
  id: string;
  email: string;
  name: string;
  role: 'AUTHORITY';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface Device {
  id: string;
  name: string;
  deviceId: string;
  type: 'VOLTAGE_SENSOR' | 'TEMPERATURE_SENSOR';
  location: string;
  coordinates: { lat: number; lng: number };
  status: 'ONLINE' | 'OFFLINE';
  lastSeen?: string;
  alerts?: Alert[];
}

export interface Alert {
  id: string;
  title: string;
  description?: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'RESOLVED';
  detectedAt: string;
  resolvedAt?: string;
  device?: Device;
  deviceId?: string;
  createdBy?: User;
  createdById?: string;
}

export interface WeatherData {
  id: string;
  zone: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  conditions: string;
  recordedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}