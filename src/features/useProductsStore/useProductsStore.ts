import { create } from 'zustand';
import type {
  PreviewProduct,
  Product,
  ProductActions,
  ProductDetailInfo
} from '@/shared/types/Product';
import {
  mockNewProduct,
  mockPreviewProduct,
  mockProductDetail,
  mockProducts
} from '../mocks/Product';
import axios from 'axios';
import { API_BASE } from '@/app/api/config';

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
    // axios.get(`${API_BASE}/products`)
    axios.get(`${API_BASE}`)
      .then((response) => {
        // set({ isLoading: false, products: response.data })
        // ВРЕМЕННО МОКИ
        set({ isLoading: false, products: mockProducts })
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
    // axios.get(`${API_BASE}/products/${id}`)
    axios.get(`${API_BASE}`)
      .then((response) => {
        // set({ isLoading: false, currentProduct: response.data })
        // ВРЕМЕННО МОКИ
        set({ isLoading: false, currentProduct: mockProductDetail })
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
      // axios.post(`${API_BASE}/products`, {
      const response = await axios.post(`${API_BASE}`, { url })
      const newProduct = response.data;
      // set((state) => ({ isLoading: false, products: [...state.products, response.data] }))
      // ВРЕМЕННО МОКИ
      set((state) => ({
        isLoading: false,
        products:
          [
            ...state.products,
            {
              ...mockNewProduct,
              id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
            }
          ]
      }))
      return newProduct;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        errorMessage: error.message
      })
    }
  },
  previewProduct: (url) => {
    // axios.post(`${API_BASE}/products/preview`, {
    axios.post(`${API_BASE}`, {
      url
    })
      .then((response) => {
        // set({ isLoading: false, preview: response.data });
        // ВРЕМЕННО МОКИ
        set({ preview: mockPreviewProduct });
      })
  },
  deleteProduct: (id) => {
    set({ isLoading: true, isError: false, errorMessage: '' });
    // axios.delete(`${API_BASE}/products/${id}`)
    axios.delete(`${API_BASE}/1`)
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