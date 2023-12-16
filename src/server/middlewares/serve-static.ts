import { type EventHandler, fromNodeMiddleware } from "h3";
import parseUrl from "parseurl";
import send from "send";

import type { Middleware } from "@/src/server/types";

// Middleware to serve static assets from a directory
//
// Usage:
// serveStatic(app, conf)(absolutePathToDirectory)
export const serveStatic: Middleware<
  (directoryPath: string) => EventHandler
> = () => {
  return (dirPath: string) => {
    return fromNodeMiddleware((req, res, _next) => {
      const parsedUrl = parseUrl(req);
      const pathname = parsedUrl ? parsedUrl.pathname! : "/";

      send(req, pathname, {
        root: dirPath,
      }).pipe(res);
    });
  };
};
