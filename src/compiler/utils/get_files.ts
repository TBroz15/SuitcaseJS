import { fdir as FDir } from "fdir";
import { copyFile, mkdir } from "fs/promises";
import { extname, basename, join } from "path";
import { CONFIG_FILE_NAMES } from "../config/get_config.js";
import { chunkArray } from "./chunk_array.js";
import { tempPack } from "./temp_folder.js";
import type { IgnoreConf } from "../config/config.js";

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
  _ignore: IgnoreConf
) => {
  const directories: string[] = [];
  const JSONFiles: string[] = [];
  const PNGFiles: string[] = [];
  const etc: string[] = [];

  const ignore: IgnoreSet = {};

  for (const key in _ignore) {
    const typedKey = key as keyof typeof _ignore;
    ignore[typedKey] = new Set(_ignore[typedKey]);
  }

  // Check if globbing is enabled and picomatch exists.
  const isGoForGlob =
    typeof ignore.globs !== "undefined" &&
    ignore.globs?.size !== 0 &&
    import.meta.resolve("picomatch");

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
        JSONFiles.push(path);
        continue;
      }
      case ".png": {
        PNGFiles.push(path);
        continue;
      }
      default: {
        etc.push(path);
        continue;
      }
    }
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
    PNGFiles: chunkArray(PNGFiles, threads),
  };
};
