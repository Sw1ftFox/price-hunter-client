import { create } from 'zustand';
import axios from 'axios';
import { API_BASE } from '@/app/api/config';
import type { AuthActions, User } from '@/shared/types/User';
import { mockUser } from '../mocks/User';
import { StorageService } from '@/shared/utils/StorageService';

interface AuthState {
  user: User | null,
  isAuth: boolean,
  isLoading: boolean,
  isError: boolean,
  errorMessage: string
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: StorageService.getItem('user'),
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
        // const { email, id, token } = response.data as User;
        StorageService.saveItem('user', mockUser)
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