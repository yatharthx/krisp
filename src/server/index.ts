import { createServer } from "node:http";

import { createApp, toNodeListener } from "h3";

import * as conf from "@/src/conf";
import { println } from "@/src/println";

import { configureApp } from "./configure";

// mutable server instance
// helps clean up the server on shutdown
let server: ReturnType<typeof createServer>;

// create h3 app
const app = createApp();
configureApp(app, conf);

export const startServer = () => {
  println.banner();
  println.info("Starting Krisp...");

  const serverPort = conf.env.portToUse;
  server = createServer(toNodeListener(app)).listen(serverPort, () => {
    println("Server listening on port %d", serverPort);
  });

  const shutdownGracefully = () => {
    println();
    println("*** Shutting gracefully ***");
    println("Bye! Have a nice day!");
    server.close();
    server.unref();
    process.exit(0);
  };

  process.on("SIGINT", () => {
    shutdownGracefully();
  });

  process.on("unhandledRejection", (err) => {
    shutdownGracefully();
  });
};
