import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { extname, basename, join } from "node:path";
import { parentPort, workerData } from "node:worker_threads";
import { fdir } from "fdir";
import { createHash } from "node:crypto";
import { errorListFile } from "../utils/temp_folder.js";
import { removeComments } from "../utils/remove_comments.js";
import { splitArray } from "../utils/split_array.js";
import { copyFile, mkdir } from "node:fs/promises";
import { CONFIG_FILE_NAMES } from "../config/get_config.js";
import Config from "../config/get_config.js";

const { threads, cache, temp } = workerData as {
  threads: number;
  cache: string;
  temp: string;
};

const functions: Functions = {
  async getFiles({ inPath }) {
    const directories: string[] = [];
    const JSONFiles: string[] = [];
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
      /*
        If a file name is empty such as ".gitignore," extname will return an empty string.
        It will use a Regex instead as a fallback to get the true extension of that file.
        Directories will return an empty string as well.

        Note that using extname is more performant than a Regex. We use regex just incase.
        - TBroz15
      */

      // If its a folder or extension and it's in the ignore list, ignore it
      if (
        ignoreFolders.includes(path.split("/")[0]) ||
        ignoreExtensions.includes(extname(path))
      )
        return;

      let ext = extname(path);

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

      // As more compressions for most files are offered, we'll switch to switch cases.
      if (ext === ".json") {
        return JSONFiles.push(path);
      } else {
        return etc.push(path);
      }
    });

    const directoryPromises = directories.map((path) =>
      mkdir(join(temp, path), { recursive: true })
    );

    // Distribute according to the amount of threads while making directories
    const [splitJSONFiles, splitEtc] = await Promise.all([
      splitArray(JSONFiles, threads),
      splitArray(etc, threads),
      ...directoryPromises,
    ]);

    return {
      JSONFiles: splitJSONFiles,
      etc: splitEtc,
    };
  },
  async copyEtc({ inPath, element: etc }) {
    // If array is empty, ignore it right away
    if (!etc[0]) return;

    const promises = etc.map((path) =>
      copyFile(join(inPath, path), join(temp, path))
    );

    await Promise.all(promises);
  },
  async minifyJSON({ inPath, element: JSONFiles }) {
    // If array is empty, ignore it right away
    if (!JSONFiles[0]) return;

    const errorList: unknown[] = [];

    const promises = JSONFiles.map(async (path) => {
      const filePath = join(temp, path);
      let data = readFileSync(join(inPath, path), "utf-8");
      const hash = createHash("md5").update(data).digest("hex");

      const cacheFile = join(cache, hash.concat(".json"));
      const cacheFileExists = existsSync(cacheFile);

      if (cacheFileExists) return copyFile(cacheFile, filePath);

      try {
        data = removeComments(data);
        // This minifies the JSON, and at the same time check one error.
        // Far better to just lint it through any editor such as VSCode.
        data = JSON.stringify(JSON.parse(data));
      } catch (error) {
        errorList.push({ error, path });
      }

      writeFileSync(filePath, data);
      return copyFile(filePath, cacheFile);
    });

    await Promise.all(promises);

    if (errorList[0]) {
      if (!existsSync(errorListFile)) writeFileSync(errorListFile, "[]");
      const allErrors = JSON.parse(
        readFileSync(errorListFile, "utf-8")
      ) as unknown[];
      allErrors.push(...errorList);
      writeFileSync(errorListFile, JSON.stringify(allErrors));
    }
  },
};

const decoder = new TextDecoder();

const receiveEncodedJSON = (buffer: ArrayBuffer) => {
  const jsonString = decoder.decode(buffer);
  return JSON.parse(jsonString) as object | never[];
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
parentPort!.on("message", async ({ buffer }) => {
  const { fn, data } = receiveEncodedJSON(buffer as ArrayBuffer) as {
    fn: keyof Functions;
    data: never;
  };

  if (typeof functions[fn] === "undefined")
    throw new Error("Function is not defined!");

  parentPort?.postMessage(await functions[fn](data));
});
