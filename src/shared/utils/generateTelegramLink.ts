export function generateTelegramLink(
  userId: string = "",
  productId: string = "",
  treshold: number | null = 0): string {
  return `
    https://t.me/PriceHunterBot?start=user_${userId}_product_${productId}_threshold_${treshold}
  `
}