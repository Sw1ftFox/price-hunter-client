import type { Price } from "../types/Product";

export const usePricePadding = (prices: Price[]): { upperLimit: number, lowerLimit: number } => {
  const filteredPrices = prices
    .map((item) => item.price)
    .filter((p) => typeof p === "number" && isFinite(p));

  if (filteredPrices.length <= 0) {
    return { upperLimit: 10, lowerLimit: 0 }
  }

  const maxPrice = Math.max(...filteredPrices);
  const minPrice = Math.min(...filteredPrices);
  const range = maxPrice - minPrice;
  const padding = Math.max(range * 0.1, 10);
  const upperLimit = maxPrice + padding;
  const lowerLimit = Math.max(0, minPrice - padding);

  return { upperLimit, lowerLimit }

}