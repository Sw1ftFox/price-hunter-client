import type { Notification } from "../../useNotifications/types/Notification"

export interface Product {
  id: number,
  nmId: string,
  name: string,
  brand: string,
  image: string,
  currentPrice: number,
  priceChange: number,
  priceChangePercent: number,
  lastChecked: string,
  marketplace: string,
  url: string
}

export interface Price {
  date: string,
  price: number
}

export interface ProductDetailInfo {
  id: number,
  nmId: string,
  name: string,
  brand: string,
  description: string,
  image: string,
  currentPrice: number,
  priceChange: number,
  priceChangePercent: number,
  lastChecked: string,
  marketplace: string,
  url: string,
  priceHistory: Price[],
  notification: Notification
}

export interface PreviewProduct {
  title: string,
  image: string,
  currentPrice: number
}

export interface ProductActions {
  fetchProducts: () => void,
  fetchProductDetailInfo: (id: number) => void,
  addProduct: (url: string) => void,
  previewProduct: (url: string) => void,
  deleteProduct: (id: number) => void,
}