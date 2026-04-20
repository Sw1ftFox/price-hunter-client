import type { ProductDetailInfo } from "./Product";

export interface CompareActions {
  fetchSelectedProducts: (ids: string[]) => Promise<ProductDetailInfo[] | void>,
  setCompareMode: (value: boolean) => void,
  toggleProduct: (id: string) => void,
  clearSelectedProducts: () => void,
}