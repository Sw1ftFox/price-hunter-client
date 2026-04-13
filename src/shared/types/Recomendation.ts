import type { Product } from "./Product";

export interface RelatedProducts {
  total: number,
  limit: number,
  offset: number,
  items: Product[]
}

export interface RecomendationsActions {
  fetchRelatedProducts: (id: string, limit?: number, offset?: number) => void,
}