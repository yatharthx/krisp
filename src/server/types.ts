import type { App } from "h3";
import type { Conf } from "@/src/conf";

export type Middleware<T = void> = (app: App, conf: Conf) => T;
