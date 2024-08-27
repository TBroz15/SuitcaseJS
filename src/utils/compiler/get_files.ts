import { fdir } from "fdir";
import { mkdir } from "fs/promises";
import { extname, basename, join } from "path";
import Config, { CONFIG_FILE_NAMES } from "../../config/get_config.js";
import { chunkArray } from "./chunk_array.js";
import { tempPack } from "./temp_folder.js";

const temp = tempPack;

export const getFiles = async ({
  inPath,
  threads,
}: {
  inPath: string;
  threads: number;
}) => {
  const directories: string[] = [];
  const JSONFiles: string[] = [];
  const PNGFiles: string[] = [];
  const etc: string[] = [];
  let ignoreFolders: string[] = [];
  let ignoreFiles: string[] = [];
  let ignoreExtensions: string[] = [];

  const arr = await new fdir({ includeDirs: true, includeBasePath: true })
    .withRelativePaths()
    .crawl(inPath)
    .withPromise();

  arr.shift();

  const regexExt = /\.([^.]+)$/;
  const config = new Config().load_config();

  if (config) {
    Object.entries(config).forEach(([key, value]) => {
      switch (key) {
        case "ignore_files":
          if (ignoreFiles.length === 0)
            ignoreFiles = value.toString().split(",");
          break;
        case "ignore_extensions":
          if (ignoreExtensions.length === 0)
            ignoreExtensions = value.toString().split(",");
          break;
        case "ignore_folders":
          if (ignoreFolders.length === 0)
            ignoreFolders = value.toString().split(",");
          break;
        default:
          break;
      }
    });
  }

  arr.forEach((path) => {
    // If its a folder or extension and it's in the ignore list, ignore it
    if (
      ignoreFolders.includes(path.split("/")[0]) ||
      ignoreExtensions.includes(extname(path))
    )
      return;

    let ext = extname(path);

    // When using extname to a file with only the ext. or a directory, it will return nothing.
    // Regex will be the fallback to get the real path.
    if (ext === "") {
      const realExt = regexExt.exec(basename(path));

      // If its a directory
      if (realExt === null) return directories.push(path);

      // If its a file and it's in the ignore list
      if (ignoreFiles.includes(realExt[0])) return;

      // or not...
      ext = realExt[0];
    }

    // If its a suitcase config file, ignore it
    if (CONFIG_FILE_NAMES.includes(path)) return;

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
