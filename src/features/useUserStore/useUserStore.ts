import { create } from 'zustand';
import { API_BASE } from '@/app/api/config';
import type { UserActions } from '@/shared/types/User';
import { StorageService } from '@/shared/utils/StorageService';
import { api } from '@/app/api/axiosInstance';

interface UserState {
  userId: string,
  isLoading: boolean,
  isError: boolean,
  errorMessage: string,
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  userId: '',
  isLoading: false,
  isError: false,
  errorMessage: '',
  fetchUserId: () => {
    set({ isLoading: true, isError: false, errorMessage: '' })
    const user = StorageService.getItem('user');
    api.get(`${API_BASE}/user`, { headers: { Authorization: `Bearer ${user?.token}` } })
      .then((response) => {
        set({ isLoading: false, userId: response.data })
      })
      .catch((error) => {
        set({
          isLoading: false,
          isError: true,
          errorMessage: error.message
        })
      });
  }
}))