import type { Options } from "../config/types/Options.js";

export const defaultSuitcaseConfig: Options = {
  ignore: {
    directories: ["node_modules", ".git", ".vscode", ".github"],
    extensions: [],
    files: [],
    globs: [],
  },
  compiler: {
    JSON: { minify: true },
    LANG: { minify: true },
    PNG: { compress: true, compressionLevel: 9, quality: 100 },
    JPG: { compress: true, progressive: true, quality: 100 },
    withCaching: true,
  },
};
