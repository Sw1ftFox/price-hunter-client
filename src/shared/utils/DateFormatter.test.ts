import { DateFormatter } from "./DateFormatter";

describe('DateFormatter', () => {
  test('Валидное значение', () => {
    expect(DateFormatter.formatDate("2026-04-08T10:30:00Z")).toBe("08.04.2026");
  })
  test('Пограничное значение 1', () => {
    expect(DateFormatter.formatDate("2026-4-8T00:00:00Z")).toBe("");
  })
  test('Пограничное значение 2', () => {
    expect(DateFormatter.formatDate("")).toBe("");
  })
  test('Пограничное значение 3', () => {
    expect(DateFormatter.formatDate("2026-40-08T10:30:00Z")).toBe("");
  })
  test('Пограничное значение 4', () => {
    expect(DateFormatter.formatDate("2026-04-80T10:30:00Z")).toBe("");
  })
  test('Пограничное значение 5', () => {
    expect(DateFormatter.formatDate("2026-04-00T10:30:00Z")).toBe("");
  })
  test('Пограничное значение 6', () => {
    expect(DateFormatter.formatDate("2026-00-01T10:30:00Z")).toBe("");
  })
  test('Пограничное значение 7', () => {
    expect(DateFormatter.formatDate("-2000-04-01T10:30:00Z")).toBe("");
  })
  test('Пограничное значение 8', () => {
    expect(DateFormatter.formatDate("2026-12-13T10:30:00Z")).toBe("13.12.2026");
  })
  test('Пограничное значение 9', () => {
    expect(DateFormatter.formatDate("2026-01-13T10:30:00Z")).toBe("13.01.2026");
  })
  test('Невалидное значение', () => {
    expect(DateFormatter.formatDate("somestring")).toBe("");
  })
});
