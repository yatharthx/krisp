import path from "node:path";

import { makeEnv } from "./utils/env";
import { makePaths } from "./utils/paths";
import { fromProjectManifest } from "./utils/conf";

export type Conf = {
  env: ReturnType<typeof makeEnv>;
  paths: ReturnType<typeof makePaths>;
  projectManifest: ReturnType<typeof fromProjectManifest>;
};

export const env = makeEnv();
export const paths = makePaths();

export const projectManifest = fromProjectManifest(
  require(path.join(paths.project.root, "manifest.json"))
);
