import type { Price } from "../types/Product";

interface PriceForecast {
  direction: 'up' | 'down' | 'stable';
  changeRub: number;
  changePercent: number;
  description: string;
}

export function getPriceForecast(
  history: Price[],
  lookbackDays: number = 7): PriceForecast | null {
  if (!history || history.length < 2) return null;

  const recent = history.slice(-Math.min(lookbackDays, history.length));
  const points = recent.map(p => ({ x: new Date(p.date).getTime(), y: p.price }));

  const n = points.length;
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const meanX = sumX / n;
  const meanY = sumY / n;

  let numerator = 0, denominator = 0;
  for (const p of points) {
    numerator += (p.x - meanX) * (p.y - meanY);
    denominator += (p.x - meanX) ** 2;
  }

  const slope = denominator === 0 ? 0 : numerator / denominator;

  const direction = slope > 0 ? 'up' : (slope < 0 ? 'down' : 'stable');

  const oneDayMs = 24 * 60 * 60 * 1000;
  const lastX = points[points.length - 1].x;
  const forecastPrice = slope * (lastX + oneDayMs) + (meanY - slope * meanX);
  const currentPrice = points[points.length - 1].y;
  const changeRub = forecastPrice - currentPrice;
  const changePercent = (changeRub / currentPrice) * 100;

  let description = '';
  if (direction === 'up') {
    description = `
      Цена растёт. Ожидаемое повышение через сутки: ≈ 
      ${Math.abs(changeRub).toFixed(0)} ₽ (${Math.abs(changePercent).toFixed(1)}%)
    `;
  } else if (direction === 'down') {
    description = `
      Цена снижается. Ожидаемое снижение через сутки: ≈ 
      ${Math.abs(changeRub).toFixed(0)} ₽ (${Math.abs(changePercent).toFixed(1)}%)
    `;
  } else {
    description = 'Цена стабильна, значительных изменений не ожидается.';
  }

  return { direction, changeRub, changePercent, description };
}