export class DateFormatter {
  static formatDate(date: string): string {
    const dateObj = new Date(date);
    const { day, month, year } = {
      day: this.formatTwoDigits(dateObj.getDate()),
      month: this.formatTwoDigits(dateObj.getMonth()),
      year: this.formatTwoDigits(dateObj.getFullYear()),
    }
    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
  }

  private static formatTwoDigits(num: number): string {
    if (num >= 10) {
      return `${num}`;
    } else {
      return `0${num}`;
    }
  }
}