import { getPriceForecast } from "./getPriceForecast";

describe('getPriceForecast', () => {
  const positivePriceHistory = [
    {
      "date": "2026-04-03T10:00:00Z",
      "price": 1680
    },
    {
      "date": "2026-04-04T10:00:00Z",
      "price": 1687
    },
    {
      "date": "2026-04-06T10:00:00Z",
      "price": 1700
    },
  ]

  const negativePriceHistory = [
    {
      "date": "2026-04-03T10:00:00Z",
      "price": 1700
    },
    {
      "date": "2026-04-04T10:00:00Z",
      "price": 1687
    },
    {
      "date": "2026-04-06T10:00:00Z",
      "price": 1680
    },
  ]

  const neutralPriceHistory = [
    {
      "date": "2026-04-03T10:00:00Z",
      "price": 1700
    },
    {
      "date": "2026-04-04T10:00:00Z",
      "price": 1700
    },
    {
      "date": "2026-04-06T10:00:00Z",
      "price": 1700
    },
  ]

  test('Прогноз для положительной истории', () => {
    expect(getPriceForecast(positivePriceHistory))
      .toEqual({
        direction: "up",
        changeRub: 6.714285714289872,
        changePercent: 0.3949579831935219,
        description: `
      Цена растёт. Ожидаемое повышение через сутки: ≈ 
      7 ₽ (0.4%)
    `,
      });
  })
  test('Прогноз для отрицательной истории', () => {
    expect(getPriceForecast(negativePriceHistory))
      .toEqual({
        direction: "down",
        changeRub: -7.571428571434808,
        changePercent: -0.45068027210921474,
        description: `
      Цена снижается. Ожидаемое снижение через сутки: ≈ 
      8 ₽ (0.5%)
    `
      });
  })
  test('Прогноз для неизменчивой истории', () => {
    expect(getPriceForecast(neutralPriceHistory))
      .toEqual({
        direction: "stable",
        changeRub: 0,
        changePercent: 0,
        description: "Цена стабильна, значительных изменений не ожидается."
      });
  })
  test('Прогноз для пустой истории', () => {
    expect(getPriceForecast([]))
      .toBe(null);
  })
});