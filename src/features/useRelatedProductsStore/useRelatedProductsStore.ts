import { create } from 'zustand';
import { API_BASE } from '@/app/api/config';
import { StorageService } from '@/shared/utils/StorageService';
import type { RelatedProductsActions, RelatedProducts } from '@/shared/types/RelatedProducts';
import { api } from '@/app/api/axiosInstance';

interface RelatedProductsState {
  relatedProducts: RelatedProducts,
  isLoading: boolean,
  isError: boolean,
  errorMessage: string
}

export const useRelatedProductsStore = create<RelatedProductsState & RelatedProductsActions>(
  (set) => ({
    relatedProducts: { items: [], limit: 0, offset: 0, total: 0 },
    isLoading: false,
    isError: false,
    errorMessage: '',
    fetchRelatedProducts: (id, limit = 6, offset = 0) => {
      set({ isLoading: true, isError: false, errorMessage: '' })
      const user = StorageService.getItem('user') || 'null'
      api.get(
        `${API_BASE}/products/${id}/related`,
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