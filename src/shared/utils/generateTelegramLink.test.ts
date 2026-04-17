import { generateTelegramLink } from "./generateTelegramLink"

describe('generateTelegramLink', () => {
  test('Валидное значение', () => {
    expect(generateTelegramLink("userId"))
      .toBe("https://t.me/pricehunternotificationbot?start=userId");
  })
  test('Пограничное значение 1', () => {
    expect(generateTelegramLink(""))
      .toBe("https://t.me/pricehunternotificationbot?start=");
  })
  test('Пограничное значение 2', () => {
    expect(generateTelegramLink(" "))
      .toBe("https://t.me/pricehunternotificationbot?start=");
  })
  test('Пограничное значение 3', () => {
    expect(generateTelegramLink())
      .toBe("https://t.me/pricehunternotificationbot?start=");
  })
});