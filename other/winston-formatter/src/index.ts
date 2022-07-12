import { format } from "winston";

const chalk = {
  bold: (text: string) => `\x1B[1m${text}\x1B[0m`,
  green: (text: string) => `\x1B[32m${text}\x1B[39m`,
  yellow: (text: string) => `\x1B[33m${text}\x1B[39m`,
  red: (text: string) => `\x1B[31m${text}\x1B[39m`,
  magentaBright: (text: string) => `\x1B[95m${text}\x1B[39m`,
  cyanBright: (text: string) => `\x1B[96m${text}\x1B[39m`,
};

export const formatter = format.combine(
  format.timestamp(),
  format.printf(args => {
    const { level, context, timestamp, message, stack } = args;
    let color = chalk.green;
    let text = "";
    if (level === "error") {
      color = chalk.red;
      text = [color(message), stack].join("\n");
    } else if (level === "info") {
      color = chalk.green;
      text = color(message);
    } else if (level === "warn") {
      color = chalk.yellow;
      text = color(message);
    } else if (level === "debug") {
      color = chalk.magentaBright;
      text = color(message);
    } else if (level === "verbose") {
      color = chalk.cyanBright;
      text = color(message);
    }

    return [
      color(`[Nest] ${process.pid}   -`),
      new Date(timestamp)
        .toISOString()
        .replace("T", " ")
        .replace(/\.\d{3}Z/, ""),
      context ? chalk.yellow(`[${context as string}]`) : "",
      text,
    ].join(" ");
  }),
);
