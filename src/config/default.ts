import type { SuitcaseConfig } from "../types/config.js";

export const defaultSuitcaseConfig: SuitcaseConfig = {
  ignore: { directories: [], extensions: [], files: [] },
  compiler: { JSON: { errorChecking: true } },
};
