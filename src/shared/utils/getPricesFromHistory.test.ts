import { getPricesFromHistory } from "./getPricesFromHistory";

describe('getPricesFromHistory', () => {
  const priceHistory_1 = [
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

  const priceHistory_2 = [
    {
      "date": "2026-04-03T10:00:00Z",
      "price": 1600
    },
    {
      "date": "2026-04-04T10:00:00Z",
      "price": 1737
    },
    {
      "date": "2026-04-05T10:00:00Z",
      "price": 1910
    },
  ]

  test('Валидное значение 1', () => {
    expect(getPricesFromHistory(priceHistory_1))
      .toEqual([1680, 1687, 1700]);
  })
  test('Валидное значение 2', () => {
    expect(getPricesFromHistory(priceHistory_2))
      .toEqual([1600, 1737, 1910]);

  })
  test('Пустой массив', () => {
    expect(getPricesFromHistory([]))
      .toEqual([]);

  })
});