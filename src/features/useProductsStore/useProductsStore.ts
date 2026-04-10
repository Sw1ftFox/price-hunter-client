import { create } from 'zustand';
import type {
  PreviewProduct,
  Product,
  ProductActions,
  ProductDetailInfo
} from '@/shared/types/Product';
import axios from 'axios';
import { API_BASE } from '@/app/api/config';
import { StorageService } from '@/shared/utils/StorageService';

interface ProductState {
  products: Product[],
  currentProduct: ProductDetailInfo | null,
  preview: PreviewProduct | null,
  isLoading: boolean,
  isError: boolean,
  errorMessage: string
}

export const useProductsStore = create<ProductState & ProductActions>((set) => ({
  products: [],
  currentProduct: null,
  preview: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
  fetchProducts: () => {
    set({ isLoading: true, isError: false, errorMessage: '' })
    const user = StorageService.getItem('user') || 'null'
    axios.get(`${API_BASE}/products`, { headers: { Authorization: `Bearer ${user?.token}` } })
      .then((response) => {
        set({ isLoading: false, products: response.data })
      })
      .catch((error) => {
        set({
          isLoading: false,
          isError: true,
          errorMessage: error.message
        })
      });
  },
  fetchProductDetailInfo: (id) => {
    set({ isLoading: true, isError: false, errorMessage: '' });
    const user = StorageService.getItem('user') || 'null'
    axios.get(`${API_BASE}/products/${id}`, { headers: { Authorization: `Bearer ${user?.token}` } })
      .then((response) => {
        set({ isLoading: false, currentProduct: response.data })
      })
      .catch(function (error) {
        set({
          isLoading: false,
          isError: true,
          errorMessage: error.message
        })
      });
  },
  addProduct: async (url) => {
    set({ isLoading: true, isError: false, errorMessage: '' });
    try {
      const user = StorageService.getItem('user') || 'null'
      const response = await axios.post(`${API_BASE}/products`,
        { url },
        { headers: { Authorization: `Bearer ${user?.token}` } })
      const newProduct = response.data;
      set((state) => ({ isLoading: false, products: [...state.products, response.data] }))
      return newProduct;
    } catch (error) {
      let message = 'Произошла непредвиденная ошибка';

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      set({
        isLoading: false,
        isError: true,
        errorMessage: message
      });
    }
  },
  previewProduct: (url) => {
    const user = StorageService.getItem('user') || 'null'
    axios.post(`${API_BASE}/products/preview`,
      { url }
      , { headers: { Authorization: `Bearer ${user?.token}` } })
      .then((response) => {
        set({ isLoading: false, preview: response.data });
      })
  },
  clearPreview: () => {
    set({ preview: null });
  },
  deleteProduct: (id) => {
    set({ isLoading: true, isError: false, errorMessage: '' });
    const user = StorageService.getItem('user') || 'null'
    axios.delete(`${API_BASE}/products/${id}`,
      { headers: { Authorization: `Bearer ${user?.token}` } }
    )
      .then(() => {
        set((state) => ({
          isLoading: false,
          products: [...state.products.filter(product => product.id !== id)]
        }))
      })
      .catch(function (error) {
        set({
          isLoading: false,
          isError: true,
          errorMessage: error.message
        })
      });
  }
}))