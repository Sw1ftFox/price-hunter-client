import type { CompareActions } from "@/shared/types/CompareProduct";
import { create } from "zustand";
import axios from "axios";
import { API_BASE } from "@/app/api/config";
import { StorageService } from "@/shared/utils/StorageService";
import type { ProductDetailInfo } from "@/shared/types/Product";

interface CompareState {
  selectedProducts: ProductDetailInfo[]
  selectedIds: Set<string>,
  isCompareActive: boolean
}

export const useCompareStore = create<CompareState & CompareActions>((set) => ({
  selectedProducts: StorageService.getItem("selectedProducts") || [],
  selectedIds: StorageService.getItem("selectedProducts") ? new Set(StorageService
    .getItem("selectedProducts")
    .map((product: ProductDetailInfo) => product.id)) : new Set(),
  isCompareActive: false,
  fetchSelectedProducts: (ids) => {
    const user = StorageService.getItem('user') || 'null'
    axios.post(
      `${API_BASE}/products/compare`,
      { ids },
      { headers: { Authorization: `Bearer ${user?.token}` } })
      .then((response) => {
        set({ selectedProducts: response.data })
        StorageService.saveItem("selectedProducts", response.data)
      })
  },
  setCompareMode: (value) => {
    set({ isCompareActive: value })
  },
  toggleProduct: (id) => set((state) => {
    const newSet = new Set(state.selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    return { selectedIds: newSet };
  }),
  clearSelectedProducts: () => {
    set({ selectedProducts: [], selectedIds: new Set() })
    StorageService.removeItem("selectedProducts");
  }
}))