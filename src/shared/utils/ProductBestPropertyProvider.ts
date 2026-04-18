import type { ProductDetailInfo } from "../types/Product";
import { getPricesFromHistory } from "./getPricesFromHistory";

interface BestPropertiesProductIds {
  currentPrice: string[],
  priceChange: string[],
  priceChangePercent: string[],
  minPrice: string[],
  maxPrice: string[],
}

interface BestProperties {
  bestCurrentPrice: number
  bestPriceChange: number
  bestPriceChangePercent: number
  bestMinPrice: number
  bestMaxPrice: number
}

export class ProductBestPropertyProvider {
  private minPriceCache = new Map<string, number>();
  private maxPriceCache = new Map<string, number>();

  findBestProductProperty(products: ProductDetailInfo[]): BestPropertiesProductIds {
    const bestProperties = this.findBestProperties(products);

    return this.findIds(products, bestProperties);
  }

  private getMinPrice(product: ProductDetailInfo): number {
    if (this.minPriceCache.has(product.id)) {
      return this.minPriceCache.get(product.id)!;
    } else {
      const minPrice = Math.min(...getPricesFromHistory(product.priceHistory))
      this.minPriceCache.set(product.id, isFinite(minPrice) ? minPrice : 0);
      return minPrice;
    }
  }

  private getMaxPrice(product: ProductDetailInfo): number {
    if (this.maxPriceCache.has(product.id)) {
      return this.maxPriceCache.get(product.id)!;
    } else {
      const maxPrice = Math.max(...getPricesFromHistory(product.priceHistory))
      this.maxPriceCache.set(product.id, isFinite(maxPrice) ? maxPrice : 0);
      return maxPrice;
    }
  }

  private findBestProperties(products: ProductDetailInfo[]): BestProperties {
    return products.reduce((acc, product) => {
      acc.bestCurrentPrice = Math.min(product.currentPrice, acc.bestCurrentPrice);
      acc.bestPriceChange = Math.min(product.priceChange, acc.bestPriceChange);
      acc.bestPriceChangePercent = Math.min(
        product.priceChangePercent,
        acc.bestPriceChangePercent);
      acc.bestMinPrice = Math.min(
        this.getMinPrice(product),
        acc.bestMinPrice);
      acc.bestMaxPrice = Math.min(
        this.getMaxPrice(product),
        acc.bestMaxPrice);
      return acc;
    }, {
      bestCurrentPrice: Infinity,
      bestPriceChange: Infinity,
      bestPriceChangePercent: Infinity,
      bestMinPrice: Infinity,
      bestMaxPrice: Infinity,
    })
  }

  private findIds(
    products: ProductDetailInfo[],
    bestProperties: BestProperties): BestPropertiesProductIds {
    const result: BestPropertiesProductIds = {
      currentPrice: [],
      priceChange: [],
      priceChangePercent: [],
      minPrice: [],
      maxPrice: [],
    };
    for (const product of products) {
      const minPrice = this.getMinPrice(product);
      const maxPrice = this.getMaxPrice(product);
      if (product.currentPrice === bestProperties.bestCurrentPrice) {
        result.currentPrice.push(product.id)
      };
      if (product.priceChange === bestProperties.bestPriceChange) {
        result.priceChange.push(product.id)
      };
      if (product.priceChangePercent === bestProperties.bestPriceChangePercent) {
        result.priceChangePercent.push(product.id)
      };
      if (minPrice === bestProperties.bestMinPrice) {
        result.minPrice.push(product.id)
      };
      if (maxPrice === bestProperties.bestMaxPrice) {
        result.maxPrice.push(product.id)
      };
    }
    return result;
  }
}