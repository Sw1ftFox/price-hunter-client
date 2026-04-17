import { getPricePadding } from "./getPricePadding";

describe('getPricePadding', () => {
  const minDifPriceHistory = [
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

  const maxDifPriceHistory = [
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

  test('Отступы для истории с небольшой разницей', () => {
    expect(getPricePadding(minDifPriceHistory))
      .toEqual({ upperLimit: 1710, lowerLimit: 1670 });
  })
  test('Отступы для истории с большой разницей', () => {
    expect(getPricePadding(maxDifPriceHistory))
      .toEqual({ upperLimit: 1941, lowerLimit: 1569 });

  })
  test('Отступы для неизменчивой истории', () => {
    expect(getPricePadding(neutralPriceHistory))
      .toEqual({ upperLimit: 1710, lowerLimit: 1690 });

  })
  test('Отступы для пустой истории', () => {
    expect(getPricePadding([]))
      .toEqual({ upperLimit: 10, lowerLimit: 0 });
    ;
  })
});