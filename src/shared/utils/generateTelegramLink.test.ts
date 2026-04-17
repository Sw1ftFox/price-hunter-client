import { generateTelegramLink } from "./generateTelegramLink"

describe('generateTelegramLink', () => {
  test('Валидное значение (строка)', () => {
    expect(generateTelegramLink("userId"))
      .toBe("https://t.me/pricehunternotificationbot?start=userId");
  })
  test('Валидное значение (число)', () => {
    expect(generateTelegramLink(246264614715))
      .toBe("https://t.me/pricehunternotificationbot?start=246264614715");
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