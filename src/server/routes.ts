import { App, createRouter, eventHandler } from "h3";

import type { Conf } from "@/src/conf";

import { controllers } from "./controllers";

export const installRouter = (app: App, _conf: Conf) => {
  const router = createRouter();

  controllers.forEach((controller) => {
    if (!controller.path) {
      throw new Error(`${controller.name}: path is not defined`);
    }

    router.get(
      controller.path,
      eventHandler(async (event) => {
        const controllerInstance = new controller();
        return await controllerInstance.action(event);
      })
    );
  });

  app.use(router);
};
