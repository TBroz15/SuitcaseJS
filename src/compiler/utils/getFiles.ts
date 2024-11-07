import { fdir as FDir } from "fdir";
import { copyFile, mkdir } from "fs/promises";
import { extname, basename, join } from "path";
import { CONFIG_FILE_NAMES } from "../config/Config.js";
import { chunkArray } from "./chunkArray.js";
import { tempPack } from "./temp_folder.js";

import type { Options } from "../config/types/Options.js";
import { doesModuleExist } from "./doesModuleExist.js";

const temp = tempPack;
const fdir = new FDir({
  includeDirs: true,
  includeBasePath: true,
}).withRelativePaths();

export interface IgnoreSet {
  directories?: Set<string>;
  extensions?: Set<string>;
  files?: Set<string>;
  globs?: Set<string>;
}

export const getFiles = async (
  inPath: string,
  threads: number,
  config: Options
) => {
  const directories: string[] = [];
  const JSONFiles: string[] = [];
  const LANGFiles: string[] = [];
  const PNGFiles: string[] = [];
  const JPGFiles: string[] = [];
  const etc: string[] = [];

  const ignore: IgnoreSet = {};

  for (const key in config.ignore) {
    const typedKey = key as keyof typeof config.ignore;
    ignore[typedKey] = new Set(config.ignore[typedKey]);
  }

  const isIgnoreGlobEmpty = ignore.globs?.size === 0;
  const isPicomatchExist = doesModuleExist("picomatch");

  if (!isPicomatchExist && !isIgnoreGlobEmpty) {
    console.warn(
      "\n⚠️ Please install picomatch to ignore files through globbing."
    );
  }

  const isGoForGlob = !isIgnoreGlobEmpty && isPicomatchExist;

  const files = await (isGoForGlob
    ? fdir.glob(...(ignore.globs as Set<string>))
    : fdir
  )
    .crawl(inPath)
    .withPromise();

  files.shift();

  const regexExt = /\.([^.]+)$/;

  for (const path of files) {
    const currentDir = path.split("/")[0];
    if (ignore.directories && ignore.directories.has(currentDir)) continue;

    let ext = extname(path);

    // When using extname to a file with only the ext. or a directory, it will return nothing.
    // Regex will be the fallback to get the real path.
    if (ext === "") {
      const realExt = regexExt.exec(basename(path));

      // If its a directory
      if (realExt === null) {
        directories.push(path);
        continue;
      }

      // If its a file and it's in the ignore list
      if (ignore.files && ignore.files.has(realExt[0])) continue;

      // or not...
      ext = realExt[0];
    }

    // If its a suitcase config file, ignore it
    if (CONFIG_FILE_NAMES.has(path)) continue;

    if (ignore.extensions && ignore.extensions.has(ext)) continue;

    switch (ext) {
      case ".json": {
        if (config.compiler.JSON.minify) {
          JSONFiles.push(path);
          continue;
        }
        break;
      }
      case ".lang": {
        if (config.compiler.LANG.minify) {
          LANGFiles.push(path);
          continue;
        }
        break;
      }
      case ".png": {
        if (config.compiler.PNG.compress) {
          PNGFiles.push(path);
          continue;
        }
        break;
      }
      case ".jpg":
      case ".jpeg": {
        if (config.compiler.JPG.compress) {
          JPGFiles.push(path);
          continue;
        }
        break;
      }
    }

    etc.push(path);
  }

  const directoryPromises = directories.map((path) =>
    mkdir(join(temp, path), { recursive: true })
  );
  void (await Promise.all(directoryPromises));

  const copyPromises = etc.map((path) =>
    copyFile(join(inPath, path), join(temp, path))
  );
  void (await Promise.all(copyPromises));

  // Distribute according to the amount of threads
  return {
    JSONFiles: chunkArray(JSONFiles, threads),
    LANGFiles: chunkArray(LANGFiles, threads),
    PNGFiles: chunkArray(PNGFiles, threads),
    JPGFiles: chunkArray(JPGFiles, threads),
  };
};
