import { type EventHandler, fromNodeMiddleware } from "h3";
import type { Middleware } from "@/src/server/types";

// Middleware to enable basic http auth
export const basicAuth: Middleware<EventHandler> = (_app, conf) => {
  const authConf = conf.projectManifest.basicAuth;

  return fromNodeMiddleware(async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
      res.statusCode = 401;
      res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
      res.end("Unauthorized");
      return;
    }

    const [username, password] = Buffer.from(
      auth.replace("Basic ", ""),
      "base64"
    )
      .toString()
      .split(":");

    if (username !== authConf.username || password !== authConf.password) {
      res.statusCode = 401;
      res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
      res.end("Unauthorized");
      return;
    }

    next();
  });
};
