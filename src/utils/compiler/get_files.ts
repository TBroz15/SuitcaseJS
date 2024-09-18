import { fdir as FDir } from "fdir";
import { copyFile, mkdir } from "fs/promises";
import { extname, basename, join } from "path";
import { CONFIG_FILE_NAMES } from "../../config/get_config.js";
import { chunkArray } from "./chunk_array.js";
import { tempPack } from "./temp_folder.js";
import type { IgnoreConf } from "../../types/config.d.ts";

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

  const arr = await (isGoForGlob
    ? fdir.glob(...(ignore.globs as Set<string>))
    : fdir
  )
    .crawl(inPath)
    .withPromise();

  arr.shift();

  const regexExt = /\.([^.]+)$/;

  arr.forEach((path) => {
    const currentDir = path.split("/")[0];
    if (ignore.directories && ignore.directories.has(currentDir)) return;

    let ext = extname(path);

    // When using extname to a file with only the ext. or a directory, it will return nothing.
    // Regex will be the fallback to get the real path.
    if (ext === "") {
      const realExt = regexExt.exec(basename(path));

      // If its a directory
      if (realExt === null) return directories.push(path);

      // If its a file and it's in the ignore list
      if (ignore.files && ignore.files.has(realExt[0])) return;

      // or not...
      ext = realExt[0];
    }

    // If its a suitcase config file, ignore it
    if (CONFIG_FILE_NAMES.has(path)) return;

    if (ignore.extensions && ignore.extensions.has(ext)) return;

    switch (ext) {
      case ".json":
        return JSONFiles.push(path);
      case ".png":
        return PNGFiles.push(path);
      default:
        return etc.push(path);
    }
  });

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
