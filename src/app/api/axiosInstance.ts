import axios from 'axios';
import { StorageService } from '@/shared/utils/StorageService';
import { API_BASE } from './config';

export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const user = StorageService.getItem('user');
    console.log('🔍 User from storage:', user);
    console.log('🔑 Token:', user?.token);
    console.log('📡 Request URL:', `${API_BASE}/products`);
    console.log('📨 Headers:', { Authorization: `Bearer ${user?.token}` });
    const isAuthEndpoint = error.config?.url?.includes('/auth/');
    if (error.response?.status === 401 && !isAuthEndpoint) {
      StorageService.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);