import gradient from "gradient-string";
import chalk from "chalk";
import { sprintf } from "sprintf-js";

// label colors
const labelColors = {
  info: {
    bg: "bgBlue",
    fg: "white",
  },
  warn: {
    bg: "bgYellow",
    fg: "black",
  },
  error: {
    bg: "bgRed",
    fg: "white",
  },
  ok: {
    bg: "bgGreen",
    fg: "black",
  },
} as const;

const createLabel = (label: "info" | "warn" | "error" | "ok") => {
  const { bg, fg } = labelColors[label];
  return chalk.bold(chalk[bg](chalk[fg](` ${label.toUpperCase()} `)));
};

// println function
type Println = {
  (text?: string, ...args: any[]): void;
} & {
  info: (text: string) => void;
  warn: (text: string) => void;
  error: (text: string) => void;
  ok: (text: string) => void;
  banner: () => void;
};

export const format = (text: string, ...args: any[]) => sprintf(text, ...args);

export const formatln = (text: string, ...args: any[]) =>
  sprintf(text, ...args) + "\n";

export const println: Println = function println(text = "", ...args) {
  const formattedText = formatln(text, ...args);
  process.stdout.write(formattedText);
};

println.info = function info(text: string, ...args: any[]) {
  println(`${createLabel("info")} ${text}`, ...args);
};

println.warn = function warn(text: string, ...args: any[]) {
  println(`${createLabel("warn")} ${text}`, ...args);
};

println.error = function error(text: string, ...args: any[]) {
  const formattedText = formatln(text, ...args);
  process.stderr.write(`${createLabel("error")} ${formattedText}`);
};

println.ok = function ok(text: string, ...args: any[]) {
  println(`${createLabel("ok")} ${text}`, ...args);
};

export const printBanner = () => {
  println(
    gradient.fruit.multiline(`
 
   _         _           
  | | ___ __(_)___ _ __  
  | |/ / '__| / __| '_ \\ 
  |   <| |  | \\__ \\ |_) |
  |_|\\_\\_|  |_|___/ .__/ 
                  |_|    
  The Blog Framework
  for people like you.

`)
  );
};

println.banner = printBanner;
