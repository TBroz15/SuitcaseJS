import { fdir } from "fdir";
import { mkdir } from "fs/promises";
import { extname, basename, join } from "path";
import { CONFIG_FILE_NAMES } from "../../config/get_config.js";
import { chunkArray } from "./chunk_array.js";
import { tempPack } from "./temp_folder.js";
import type { IgnoreConf } from "../../types/config.d.ts";

const temp = tempPack;

export const getFiles = async ({
  inPath,
  threads,
  ignore,
}: {
  inPath: string;
  threads: number;
  ignore: IgnoreConf;
}) => {
  const directories: string[] = [];
  const JSONFiles: string[] = [];
  const PNGFiles: string[] = [];
  const etc: string[] = [];

  const arr = await new fdir({ includeDirs: true, includeBasePath: true })
    .withRelativePaths()
    .crawl(inPath)
    .withPromise();

  arr.shift();

  const regexExt = /\.([^.]+)$/;

  arr.forEach((path) => {
    if (ignore.directories.includes(path.split("/")[0])) return;

    let ext = extname(path);

    // When using extname to a file with only the ext. or a directory, it will return nothing.
    // Regex will be the fallback to get the real path.
    if (ext === "") {
      const realExt = regexExt.exec(basename(path));

      // If its a directory
      if (realExt === null) return directories.push(path);

      // If its a file and it's in the ignore list
      if (ignore.files.includes(realExt[0])) return;

      // or not...
      ext = realExt[0];
    }

    // If its a suitcase config file, ignore it
    if (CONFIG_FILE_NAMES.includes(path)) return;

    if (ignore.extensions.includes(ext)) return;

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

  // Distribute according to the amount of threads while making directories
  const [splitJSONFiles, splitPNG, splitETC] = await Promise.all([
    chunkArray(JSONFiles, threads),
    chunkArray(PNGFiles, threads),
    chunkArray(etc, threads),
    ...directoryPromises,
  ]);

  return {
    JSONFiles: splitJSONFiles,
    PNGFiles: splitPNG,
    etc: splitETC,
  };
};
