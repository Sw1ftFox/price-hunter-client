import { create } from 'zustand';
import { API_BASE } from '@/app/api/config';
import { StorageService } from '@/shared/utils/StorageService';
import { api } from '@/app/api/axiosInstance';

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
      api.post(
        `${API_BASE}/products/compare/recommendation`,
        { ids },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
        .then((response) => {
          const recommendationText = response.data?.gptOpinion || '';
          set({
            isLoading: false,
            recommendation: recommendationText
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