import { create } from 'zustand';
import axios from 'axios';
import { API_BASE } from '@/app/api/config';
import { StorageService } from '@/shared/utils/StorageService';
import type { RecomendationsActions, RelatedProducts } from '@/shared/types/Recomendation';

interface RecomendationsState {
  relatedProducts: RelatedProducts,
  isLoading: boolean,
  isError: boolean,
  errorMessage: string
}

export const useRecomendationsStore = create<RecomendationsState & RecomendationsActions>(
  (set) => ({
    relatedProducts: { items: [], limit: 0, offset: 0, total: 0 },
    isLoading: false,
    isError: false,
    errorMessage: '',
    fetchRelatedProducts: (id, limit = 6, offset = 0) => {
      set({ isLoading: true, isError: false, errorMessage: '' })
      const user = StorageService.getItem('user') || 'null'
      axios.get(
        `${API_BASE}/products/${id}/recommendations`,
        { params: { limit, offset }, headers: { Authorization: `Bearer ${user?.token}` } }
      )
        .then((response) => {
          set((state) => ({
            isLoading: false,
            relatedProducts: {
              ...response.data,
              items: [...state.relatedProducts.items, ...response.data.items]
            }
          }))
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