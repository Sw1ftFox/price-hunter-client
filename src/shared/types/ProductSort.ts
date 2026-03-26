export const ProductSort = {
  PRICE_INC: 'priceInc',
  PRICE_DESC: 'priceDesc',
  BY_NAME: 'name',
  BY_PROFIT: 'profit'
} as const

export type ProductSortType = (typeof ProductSort)[keyof typeof ProductSort]

export const PRODUCT_LABEL: Record<ProductSortType, string> = {
  [ProductSort.PRICE_INC]: 'Цене (По возрастанию)',
  [ProductSort.PRICE_DESC]: 'Цене (По убыванию)',
  [ProductSort.BY_NAME]: 'Названию',
  [ProductSort.BY_PROFIT]: 'Выгоде'
}