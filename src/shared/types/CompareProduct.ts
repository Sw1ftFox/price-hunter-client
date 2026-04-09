export interface CompareActions {
  fetchSelectedProducts: (ids: string[]) => void,
  setCompareMode: (value: boolean) => void,
  toggleProduct: (id: string) => void,
  clearSelectedProducts: () => void,
}