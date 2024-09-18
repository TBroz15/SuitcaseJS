import type { Options } from "../types/config.js";

export const defaultSuitcaseConfig: Options = {
  ignore: {
    directories: [],
    extensions: [],
    files: [],
    globs: [],
  },
  compiler: {
    JSON: { minify: true, errorChecking: true },
    LANG: { minify: true },
    PNG: { compress: true },
    JPG: { compress: true },
    withCaching: true,
  },
};
