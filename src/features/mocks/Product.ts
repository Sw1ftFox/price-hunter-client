import type {
  Product,
  Price,
  PreviewProduct,
  ProductDetailInfo
} from "@/shared/types/Product";

export const mockProducts: Product[] = [
  {
    id: 1,
    nmId: '311322319',
    name: 'Бомбочки для ванны подарочный набор bonbons 360 гр',
    brand: 'Laboratory KATRIN',
    image: 'https://ir-3.ozone.ru/s3/multimedia-1-x/8242310085.jpg',
    currentPrice: 1450,
    priceChange: -50,
    priceChangePercent: -3.33,
    lastChecked: '2026-03-19T10:30:00Z',
    marketplace: 'wb',
    url: 'https://www.wildberries.ru/catalog/311322319/detail.aspx',
  },
  {
    id: 2,
    nmId: '1218758714',
    name: 'LIMALAMA Ремень мужской кожаный',
    brand: 'LIMALAMA',
    image: 'https://ir-3.ozone.ru/s3/multimedia-1-x/8242310085.jpg',
    currentPrice: 1687,
    priceChange: 120,
    priceChangePercent: 7.66,
    lastChecked: '2026-03-19T11:15:00Z',
    marketplace: 'ozon',
    url: 'https://www.ozon.ru/product/limalama-remen-remen-muzhskoy-kozhanyy-1218758714/',
  },
  {
    id: 3,
    nmId: '123456789',
    name: 'Смартфон Xiaomi Redmi Note 13',
    brand: 'Xiaomi',
    image: 'https://ir-3.ozone.ru/s3/multimedia-1-x/1234567890.jpg',
    currentPrice: 24990,
    priceChange: -500,
    priceChangePercent: -1.96,
    lastChecked: '2026-03-19T09:45:00Z',
    marketplace: 'wb',
    url: 'https://www.wildberries.ru/catalog/123456789/detail.aspx',
  },
];

export const mockNewProduct: Product = {
  id: 4,
  nmId: '123456789',
  name: 'Смартфон Xiaomi Redmi Note 13',
  brand: 'Xiaomi',
  image: 'https://ir-3.ozone.ru/s3/multimedia-1-x/1234567890.jpg',
  currentPrice: 24990,
  priceChange: -500,
  priceChangePercent: -1.96,
  lastChecked: '2026-03-19T09:45:00Z',
  marketplace: 'wb',
  url: 'https://www.wildberries.ru/catalog/123456789/detail.aspx',
}

export const mockPriceHistory: Price[] = [
  { date: '2026-03-14T10:00:00Z', price: 1500 },
  { date: '2026-03-15T10:00:00Z', price: 1490 },
  { date: '2026-03-16T10:00:00Z', price: 1480 },
  { date: '2026-03-17T10:00:00Z', price: 1460 },
  { date: '2026-03-18T10:00:00Z', price: 1450 },
  { date: '2026-03-19T10:00:00Z', price: 1450 },
];

export const mockProductDetail: ProductDetailInfo = {
  id: 1,
  nmId: '311322319',
  name: 'Бомбочки для ванны подарочный набор bonbons 360 гр',
  brand: 'Laboratory KATRIN',
  // eslint-disable-next-line max-len
  description: 'Подарочный набор бомбочек для ванны "Candy Bath Bar" включает 9 шариков в виде конфет. Диаметр каждой бомбочки составляет 4 см, а масса — 40 граммов. В наборе представлены ароматы: благородная ваниль, изысканный шоколад и клюква в сахаре.',
  image: 'https://ir-3.ozone.ru/s3/multimedia-1-x/8242310085.jpg',
  currentPrice: 1450,
  priceChange: -50,
  priceChangePercent: -3.33,
  lastChecked: '2026-03-19T10:30:00Z',
  marketplace: 'wb',
  url: 'https://www.wildberries.ru/catalog/311322319/detail.aspx',
  priceHistory: mockPriceHistory,
  notification: {
    enabled: true,
    tresholdPrice: 1400,
  },
};

export const mockPreviewProduct: PreviewProduct = {
  title: 'Бомбочки для ванны подарочный набор bonbons 360 гр',
  image: 'https://ir-3.ozone.ru/s3/multimedia-1-x/8242310085.jpg',
  currentPrice: 1450,
};