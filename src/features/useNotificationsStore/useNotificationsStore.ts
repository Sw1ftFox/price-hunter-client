import { create } from 'zustand';
import axios from 'axios';
import { API_BASE } from '@/app/api/config';
import type { Notification, NotificationActions } from '@/shared/types/Notification';
import { mockNotification } from '../mocks/Notification';

interface NotificationState {
  notification: Notification | null,
  isLoading: boolean,
  isError: boolean,
  errorMessage: string
}

export const useNotificationsStore = create<NotificationState & NotificationActions>((set) => ({
  notification: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
  addNotification: (id, tresholdPrice, enabled) => {
    set({ isLoading: true, isError: false, errorMessage: '' })
    // axios.get(`${API_BASE}/products/${id}/notification`)
    axios.put(`${API_BASE}`, { tresholdPrice, enabled })
      .then((response) => {
        // set({ isLoading: false, notification: response.data })
        // ВРЕМЕННО МОКИ
        set({ isLoading: false, notification: mockNotification })
      })
      .catch((error) => {
        set({
          isLoading: false,
          isError: true,
          errorMessage: error.message
        })
      });
  },
  deleteNotification: (id, enabled) => {
    set({ isLoading: true, isError: false, errorMessage: '' })
    // axios.get(`${API_BASE}/products/${id}/notification`)
    axios.put(`${API_BASE}`, { enabled })
      .then(() => {
        set({ isLoading: false, notification: null })
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