import { formatTimeElapsed } from './formatTimeElapsed';

describe('formatTimeElapsed', () => {
  describe('при передаче числа (разницы в мс)', () => {
    test('только что (менее 60 секунд)', () => {
      expect(formatTimeElapsed(0)).toBe('только что');
      expect(formatTimeElapsed(1000)).toBe('только что');
      expect(formatTimeElapsed(59000)).toBe('только что');
    });

    test('минуты (1, 2, 5, 21, 22, 25)', () => {
      expect(formatTimeElapsed(60_000)).toBe('1 минуту назад');
      expect(formatTimeElapsed(120_000)).toBe('2 минуты назад');
      expect(formatTimeElapsed(300_000)).toBe('5 минут назад');
      expect(formatTimeElapsed(21 * 60_000)).toBe('21 минуту назад');
      expect(formatTimeElapsed(22 * 60_000)).toBe('22 минуты назад');
      expect(formatTimeElapsed(25 * 60_000)).toBe('25 минут назад');
    });

    test('часы (1, 2, 5, 21, 22, 24)', () => {
      expect(formatTimeElapsed(3_600_000)).toBe('1 час назад');
      expect(formatTimeElapsed(7_200_000)).toBe('2 часа назад');
      expect(formatTimeElapsed(18_000_000)).toBe('5 часов назад');
      expect(formatTimeElapsed(21 * 3_600_000)).toBe('21 час назад');
      expect(formatTimeElapsed(22 * 3_600_000)).toBe('22 часа назад');
      expect(formatTimeElapsed(24 * 3_600_000)).toBe('1 день назад');
    });

    test('дни (1, 2, 5)', () => {
      expect(formatTimeElapsed(24 * 3_600_000)).toBe('1 день назад');
      expect(formatTimeElapsed(2 * 24 * 3_600_000)).toBe('2 дня назад');
      expect(formatTimeElapsed(5 * 24 * 3_600_000)).toBe('5 дней назад');
    });

    test('недели (1, 2, 5, 21)', () => {
      expect(formatTimeElapsed(7 * 24 * 3_600_000)).toBe('1 неделю назад');
      expect(formatTimeElapsed(14 * 24 * 3_600_000)).toBe('2 недели назад');
      expect(formatTimeElapsed(35 * 24 * 3_600_000)).toBe('5 недель назад');
      expect(formatTimeElapsed(21 * 7 * 24 * 3_600_000)).toBe('21 неделю назад');
    });

    test('отрицательная разница (будущее) -> 0', () => {
      expect(formatTimeElapsed(-1000)).toBe('только что');
      expect(formatTimeElapsed(-3_600_000)).toBe('только что');
    });
  });

  describe('при передаче строки (ISO дата)', () => {
    const now = new Date('2026-04-17T12:00:00Z').getTime();

    beforeAll(() => {
      vi.spyOn(Date, 'now').mockImplementation(() => now);
    });

    afterAll(() => {
      vi.restoreAllMocks();
    });

    test('валидная строка, 5 минут назад', () => {
      const fiveMinutesAgo = new Date(now - 5 * 60_000).toISOString();
      expect(formatTimeElapsed(fiveMinutesAgo)).toBe('5 минут назад');
    });

    test('невалидная строка', () => {
      expect(formatTimeElapsed('not a date')).toBe('только что');
      expect(formatTimeElapsed('')).toBe('только что');
    });

    test('будущая дата (отрицательная разница)', () => {
      const future = new Date(now + 1000).toISOString();
      expect(formatTimeElapsed(future)).toBe('только что');
    });
  });

  describe('при передаче объекта Date', () => {
    const now = new Date('2026-04-17T12:00:00Z').getTime();
    beforeAll(() => {
      vi.spyOn(Date, 'now').mockImplementation(() => now);
    });
    afterAll(() => {
      vi.restoreAllMocks();
    });

    test('валидная дата', () => {
      const twoHoursAgo = new Date(now - 2 * 3_600_000);
      expect(formatTimeElapsed(twoHoursAgo)).toBe('2 часа назад');
    });

    test('невалидная дата (NaN)', () => {
      const invalidDate = new Date('invalid');
      expect(formatTimeElapsed(invalidDate)).toBe('только что');
    });
  });

  describe('пограничные значения между единицами', () => {
    test('59 секунд -> только что', () => {
      expect(formatTimeElapsed(59_000)).toBe('только что');
    });
    test('60 секунд -> 1 минута', () => {
      expect(formatTimeElapsed(60_000)).toBe('1 минуту назад');
    });
    test('59 минут -> 59 минут', () => {
      expect(formatTimeElapsed(59 * 60_000)).toBe('59 минут назад');
    });
    test('60 минут -> 1 час', () => {
      expect(formatTimeElapsed(60 * 60_000)).toBe('1 час назад');
    });
    test('23 часа -> 23 часа', () => {
      expect(formatTimeElapsed(23 * 3_600_000)).toBe('23 часа назад');
    });
    test('24 часа -> 1 день', () => {
      expect(formatTimeElapsed(24 * 3_600_000)).toBe('1 день назад');
    });
    test('6 дней -> 6 дней', () => {
      expect(formatTimeElapsed(6 * 24 * 3_600_000)).toBe('6 дней назад');
    });
    test('7 дней -> 1 неделя', () => {
      expect(formatTimeElapsed(7 * 24 * 3_600_000)).toBe('1 неделю назад');
    });
    test('13 дней -> 1 неделя',
      () => {
        expect(formatTimeElapsed(13 * 24 * 3_600_000)).toBe('1 неделю назад');
      });
  });
});