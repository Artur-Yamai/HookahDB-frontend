import chalk from "chalk";

const lessThanTen = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

class LoggerService {
  private getDate(): string {
    const now: Date = new Date();
    const year: number = now.getFullYear();
    const month: number = now.getMonth() + 1;
    const day: number = now.getDate();
    const H: number = now.getHours();
    const M: number = now.getMinutes();
    const S: number = now.getSeconds();
    const ms: number = now.getMilliseconds();

    return `${lessThanTen(day)}-${lessThanTen(month)}-${year} ${lessThanTen(
      H
    )}:${lessThanTen(M)}:${lessThanTen(S)}.${ms}`;
  }

  private logger(...args: unknown[]): void {
    console.log(this.getDate(), ...args);
  }

  public log(...args: unknown[]): void {
    this.logger(chalk.bgBlue(" INFO "), ...args);
  }

  public error(...args: unknown[]): void {
    this.logger(chalk.bgRed(" ERROR "), ...args);
  }

  public warn(...args: unknown[]): void {
    this.logger(chalk.bgYellow(" WARN "), ...args);
  }
}

export default new LoggerService();
