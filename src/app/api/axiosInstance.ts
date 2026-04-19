import axios from 'axios';
import { StorageService } from '@/shared/utils/StorageService';

export const api = axios.create();

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