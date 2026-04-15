export function formatTimeElapsed(diffMs: number | string | Date): string {
  let ms: number;
  if (typeof diffMs === 'number') {
    ms = diffMs;
  } else {
    const last = new Date(diffMs).getTime();
    ms = Date.now() - last;
    if (isNaN(ms)) ms = 0;
  }

  if (ms < 0) ms = 0;

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  const declension = (num: number, forms: [string, string, string]): string => {
    const n = Math.abs(num) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];
    return forms[2];
  };

  if (seconds < 60) {
    return 'только что';
  }

  if (minutes < 60) {
    const word = declension(minutes, ['минуту', 'минуты', 'минут']);
    return `${minutes} ${word} назад`;
  }

  if (hours < 24) {
    const word = declension(hours, ['час', 'часа', 'часов']);
    return `${hours} ${word} назад`;
  }

  if (days < 7) {
    const word = declension(days, ['день', 'дня', 'дней']);
    return `${days} ${word} назад`;
  }

  const word = declension(weeks, ['неделю', 'недели', 'недель']);
  return `${weeks} ${word} назад`;
}