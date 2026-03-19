import { create } from 'zustand';
import axios from 'axios';
import { API_BASE } from '@/app/api/config';
import type { AuthActions, User } from './types/User';
import { mockUser } from '../mocks/User';
import { StorageService } from '@/shared/utils/StorageService/StorageService';

interface AuthState {
  user: User | null,
  isAuth: boolean,
  isLoading: boolean,
  isError: boolean,
  errorMessage: string
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isAuth: StorageService.getItem('user'),
  isLoading: false,
  isError: false,
  errorMessage: '',
  authUser: (email, password, type, onSuccess) => {
    set({ isLoading: true, isError: false, errorMessage: '' })
    // axios.get(`${API_BASE}/auth/${type}`)
    axios.post(`${API_BASE}`, { email, password })
      .then((response) => {
        // set({ isLoading: false, isAuth: true, user: response.data })
        // ВРЕМЕННО МОКИ
        set({ isLoading: false, isAuth: true, user: mockUser })
        if (onSuccess) onSuccess()
        StorageService.saveItem('user', response.data)
      })
      .catch((error) => {
        set({
          isLoading: false,
          isError: true,
          errorMessage: error.message
        })
      });
  },
  logout: (onExit) => {
    set({ user: null, isAuth: false })
    if (onExit) onExit()
    StorageService.removeItem('user')
  }
}))