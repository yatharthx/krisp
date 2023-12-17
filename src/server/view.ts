import path from "node:path";

import nunjucks from "nunjucks";

import * as conf from "@/src/conf";

// nunjucks setup for templating (views)
const viewsPath = conf.projectManifest.isUsingOfficialTheme
  ? path.join(conf.paths.krisp.themes[conf.projectManifest.theme], "pages")
  : path.join(conf.paths.project.pages);
const njk = nunjucks.configure(viewsPath, {
  autoescape: true,
  watch: conf.env.isDevelopment,
});

export const view = {
  render: (template: string, context: Record<string, unknown>): string => {
    // extend context with project manifest
    const { basicAuth, ...restOfManifest } = conf.projectManifest;
    const extendedContext = {
      $manifest: restOfManifest,
      ...context,
    };

    // TODO: add extension based on configuration
    return njk.render(`${template}.njk`, extendedContext);
  },
};
