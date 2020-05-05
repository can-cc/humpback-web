export class AppLogger {
  static log(...args) {
    console.log(...args);
  }

  static warn(...args) {
    console.warn(...args);
  }

  static error(...args) {
    console.error(...args);
  }
}
