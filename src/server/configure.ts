import path from "node:path";
import { type App } from "h3";

import type { Conf } from "@/src/conf";

import { basicAuth } from "./middlewares/basic-auth";
import { serveStatic } from "./middlewares/serve-static";
import { installRouter } from "./routes";

export const configureApp = (app: App, conf: Conf) => {
  // middleware to be applied before the router
  if (conf.projectManifest.basicAuth) {
    app.use("/", basicAuth(app, conf));
  }

  // router
  installRouter(app, conf);

  // middleware to be applied after the router
  if (conf.projectManifest.isUsingOfficialTheme) {
    app.use(
      "/assets",
      serveStatic(
        app,
        conf
      )(
        path.join(conf.paths.krisp.themes[conf.projectManifest.theme], "assets")
      )
    );
  }
  app.use("/", serveStatic(app, conf)(conf.paths.project.public));
};
