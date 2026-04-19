import axios from 'axios';
import { StorageService } from '@/shared/utils/StorageService';
import { API_BASE } from './config';

export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint = error.config?.url?.includes('/auth/');
    if (error.response?.status === 401 && !isAuthEndpoint) {
      StorageService.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);