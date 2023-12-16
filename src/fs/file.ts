import fs from "graceful-fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

export class File {
  static async read(path: string) {
    return readFile(path, "utf-8");
  }

  static async stat(path: string) {
    return stat(path);
  }
}
