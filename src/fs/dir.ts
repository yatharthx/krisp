import fs from "graceful-fs";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const existsSync = fs.existsSync;

export class Dir {
  static async read(path: string) {
    return readdir(path);
  }

  static async filesOfType(path: string, type: string | string[] | RegExp) {
    const files = await this.read(path);
    return files.filter((file) => {
      if (Array.isArray(type)) {
        return type.some((t) => file.endsWith(t));
      } else if (typeof type === "string") {
        return file.endsWith(type);
      } else if (type instanceof RegExp) {
        return type.test(file);
      }
    });
  }

  static existsSync(path: string) {
    return existsSync(path);
  }

  static async ensureExists(
    path: string,
    options?: { recursive: boolean; mode: number }
  ) {
    try {
      if (this.existsSync(path)) {
        return;
      }

      return mkdir(path, options);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "EEXIST") {
        return;
      }

      throw err;
    }
  }
}
