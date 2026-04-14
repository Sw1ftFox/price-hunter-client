import { create } from 'zustand';
import axios from 'axios';
import { API_BASE } from '@/app/api/config';
import { StorageService } from '@/shared/utils/StorageService';

interface RecommendationsState {
  recommendation: string,
  isLoading: boolean,
  isError: boolean,
  errorMessage: string
}

interface RecommendationsActions {
  fetchRecommendation: (ids: string[]) => void,
  clearRecommendation: () => void
}

export const useRecommendationsStore = create<RecommendationsState & RecommendationsActions>(
  (set) => ({
    recommendation: "",
    isLoading: false,
    isError: false,
    errorMessage: '',
    fetchRecommendation: (ids) => {
      set({ isLoading: true, isError: false, errorMessage: '' })
      const user = StorageService.getItem('user') || 'null'
      axios.post(
        `${API_BASE}/products/recommendation`,
        { ids },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
        .then((response) => {
          set({
            isLoading: false,
            recommendation: response.data
          })
        })
        .catch((error) => {
          set({
            isLoading: false,
            isError: true,
            errorMessage: error.message
          })
        });
    },
    clearRecommendation: () => {
      set({
        recommendation: ""
      })
    }
  }))