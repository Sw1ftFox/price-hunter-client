export function generateTelegramLink(
  userId: string | number = "") {
  return `https://t.me/pricehunternotificationbot?start=${typeof userId === "string"
    ? userId.trim()
    : userId
  }`
}