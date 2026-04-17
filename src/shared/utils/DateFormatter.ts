export class DateFormatter {
  static formatDate(str: string): string {
    const date = Date.parse(str);
    if (isNaN(date)) {
      return "";
    }
    const dateObj = new Date(str);
    const { day, month, year } = {
      day: this.formatTwoDigits(dateObj.getDate()),
      month: this.formatTwoDigits(dateObj.getMonth(), true),
      year: this.formatTwoDigits(dateObj.getFullYear()),
    }
    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
  }

  private static formatTwoDigits(num: number, isAddUnit?: boolean): string {
    if (num >= 10) {
      return isAddUnit ? `${num + 1}` : `${num}`;
    } else {
      return isAddUnit ? `0${num + 1}` : `0${num}`;
    }
  }
}