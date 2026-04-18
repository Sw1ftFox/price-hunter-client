import type { ProductDetailInfo } from "../types/Product";
import { ProductBestPropertyProvider } from "./ProductBestPropertyProvider";

describe('ProductBestPropertyProvider', () => {
  let provider: ProductBestPropertyProvider;

  const createProduct = (
    id: string,
    currentPrice: number,
    priceChange: number,
    priceChangePercent: number,
    priceHistory: { date: string; price: number }[]
  ): ProductDetailInfo => ({
    id,
    nmId: '',
    name: '',
    brand: '',
    description: '',
    image: '',
    lastChecked: '',
    marketplace: '',
    url: '',
    notification: { enabled: false, thresholdPrice: null },
    currentPrice,
    priceChange,
    priceChangePercent,
    priceHistory,
  });

  const emptyProduct = createProduct("prod_e", 0, 0, 0, [])

  const zeroProduct = createProduct("prod_0", 0, 0, 0, [
    { date: '2026-01-01', price: 0 },
    { date: '2026-01-02', price: 0 },
    { date: '2026-01-03', price: 0 },
  ])

  const productA = createProduct("prod_a", 100, -10, -5, [
    { date: '2026-01-01', price: 120 },
    { date: '2026-01-02', price: 110 },
    { date: '2026-01-03', price: 100 },
  ])

  const productB = createProduct("prod_b", 110, 10, 5, [
    { date: '2026-01-01', price: 110 },
    { date: '2026-01-02', price: 130 },
    { date: '2026-01-03', price: 110 },
  ])

  const productC = createProduct("prod_c", 105, -15, -10, [
    { date: '2026-01-01', price: 130 },
    { date: '2026-01-02', price: 100 },
    { date: '2026-01-03', price: 90 },
  ])

  beforeEach(() => {
    provider = new ProductBestPropertyProvider();
  })

  test('Все характеристики лучшие у 1 товара', () => {
    expect(provider.findBestProductProperty([productA, productB])).toEqual({
      currentPrice: ["prod_a"],
      priceChange: ["prod_a"],
      priceChangePercent: ["prod_a"],
      minPrice: ["prod_a"],
      maxPrice: ["prod_a"],
    })
  });
  test('Все характеристики лучшие у разных товаров', () => {
    expect(provider.findBestProductProperty([productA, productC])).toEqual({
      currentPrice: ["prod_a"],
      priceChange: ["prod_c"],
      priceChangePercent: ["prod_c"],
      minPrice: ["prod_c"],
      maxPrice: ["prod_a"],
    })
  });
  test('Пустая история цен у товара', () => {
    expect(provider.findBestProductProperty([emptyProduct])).toEqual({
      currentPrice: ["prod_e"],
      priceChange: ["prod_e"],
      priceChangePercent: ["prod_e"],
      minPrice: [],
      maxPrice: [],
    })
  });
  test('Нулевые значения у товара', () => {
    expect(provider.findBestProductProperty([zeroProduct])).toEqual({
      currentPrice: ["prod_0"],
      priceChange: ["prod_0"],
      priceChangePercent: ["prod_0"],
      minPrice: ["prod_0"],
      maxPrice: ["prod_0"],
    })
  });
  test('Пустой массив', () => {
    expect(provider.findBestProductProperty([])).toEqual({
      currentPrice: [],
      priceChange: [],
      priceChangePercent: [],
      minPrice: [],
      maxPrice: [],
    })
  });
})

