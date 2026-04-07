import { create } from 'zustand';
import axios from 'axios';
import { API_BASE } from '@/app/api/config';
import type { Notification, NotificationActions } from '@/shared/types/Notification';
import { StorageService } from '@/shared/utils/StorageService';

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
    const user = StorageService.getItem('user') || 'null'
    axios.patch(`${API_BASE}/products/${id}/notification`,
      { tresholdPrice, enabled },
      { headers: { Authorization: `Bearer ${user?.token}` } })
      .then((response) => {
        set({ isLoading: false, notification: response.data })
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
    const user = StorageService.getItem('user') || 'null'
    axios.patch(`${API_BASE}/products/${id}/notification/unsubscribe`,
      { enabled },
      { headers: { Authorization: `Bearer ${user?.token}` } })
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