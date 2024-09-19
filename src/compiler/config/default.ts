import type { Options } from "../config/config.d.ts";

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
