export function generateTelegramLink(
  userId: string = "") {
  if (typeof userId === "string") {
    return `https://t.me/pricehunternotificationbot?start=${userId.trim()}`
  } else {
    return "";
  }
}