import type { Price } from "../types/Product";

export function getPricesFromHistory(priceHistory: Price[]): number[] {
  return priceHistory ? priceHistory.map(priceObj => priceObj.price) : [];
}