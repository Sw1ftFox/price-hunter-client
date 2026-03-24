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
    axios.get(`${API_BASE}/products/${id}`)
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
  addProduct: (url) => {
    set({ isLoading: true, isError: false, errorMessage: '' });
    axios.post(`${API_BASE}/products`, {
      url
    })
      .then((response) => {
        // set((state) => ({ isLoading: false, products: [...state.products, response.data] }))
        // ВРЕМЕННО МОКИ
        set((state) => ({ isLoading: false, products: [...state.products, mockNewProduct] }))
      })
      .catch(function (error) {
        set({
          isLoading: false,
          isError: true,
          errorMessage: error.message
        })
      });
  },
  previewProduct: (url) => {
    set({ isLoading: true, isError: false, errorMessage: '' });
    axios.post(`${API_BASE}/products/preview`, {
      url
    })
      .then((response) => {
        // set({ isLoading: false, preview: response.data });
        // ВРЕМЕННО МОКИ
        set({ isLoading: false, preview: mockPreviewProduct });
      })
      .catch(function (error) {
        set({
          isLoading: false,
          isError: true,
          errorMessage: error.message
        })
      });
  },
  deleteProduct: (id) => {
    set({ isLoading: true, isError: false, errorMessage: '' });
    axios.delete(`${API_BASE}/products/${id}`)
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