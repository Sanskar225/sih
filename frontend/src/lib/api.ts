import axios from 'axios';
import { AuthResponse, Alert, Device, WeatherData, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Alerts API
export const alertsApi = {
  getAll: async (): Promise<ApiResponse<Alert[]>> => {
    const response = await api.get('/alerts');
    return response.data;
  },
  
  getById: async (id: string): Promise<ApiResponse<Alert>> => {
    const response = await api.get(`/alerts/${id}`);
    return response.data;
  },
  
  create: async (alertData: Partial<Alert>): Promise<ApiResponse<Alert>> => {
    const response = await api.post('/alerts', alertData);
    return response.data;
  },
  
  update: async (id: string, alertData: Partial<Alert>): Promise<ApiResponse<Alert>> => {
    const response = await api.put(`/alerts/${id}`, alertData);
    return response.data;
  },
  
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/alerts/${id}`);
    return response.data;
  },
};

// Devices API
export const devicesApi = {
  getAll: async (): Promise<Device[]> => {
    const response = await api.get('/devices');
    return response.data;
  },
  
  getById: async (id: string): Promise<Device> => {
    const response = await api.get(`/devices/${id}`);
    return response.data;
  },
  
  create: async (deviceData: Partial<Device>): Promise<{ message: string; device: Device }> => {
    const response = await api.post('/devices', deviceData);
    return response.data;
  },
  
  update: async (id: string, deviceData: Partial<Device>): Promise<{ message: string; device: Device }> => {
    const response = await api.put(`/devices/${id}`, deviceData);
    return response.data;
  },
  
  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/devices/${id}`);
    return response.data;
  },
};

// Weather API
export const weatherApi = {
  getCurrent: async (location: string): Promise<ApiResponse<WeatherData>> => {
    const response = await api.get(`/weather/current?location=${location}`);
    return response.data;
  },
};

export default api;