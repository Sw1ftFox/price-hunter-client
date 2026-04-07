export function generateTelegramLink(
  userId: string = "") {
  return `https://t.me/pricehunternotificationbot?start=${userId}`
}