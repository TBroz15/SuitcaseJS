import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { extname, basename, join } from "node:path";
import { parentPort, workerData } from "node:worker_threads";
import { fdir } from "fdir";
import { createHash } from "node:crypto";
import { errorListFile } from "../utils/temp_folder.js";
import { removeComments } from "../utils/remove_comments.js";
import { splitArray } from "../utils/split_array.js";
import { copyFile, mkdir } from "node:fs/promises";

const { threads, cache, temp } = workerData;

// Warm up fdir
new fdir({ includeDirs: true })
  .withRelativePaths()
  .crawl("warmup")
  .withPromise();

const functions: { [key: string]: (key: any) => void } = {
  async getFiles({ inPath }: any) {
    const directories: string[] = [];
    const JSONFiles: string[] = [];
    const etc: string[] = [];

    const arr = await new fdir({ includeDirs: true, includeBasePath: true })
      .withRelativePaths()
      .crawl(inPath)
      .withPromise();

    arr.shift();

    const regexExt = /\.([^.]+)$/;

    arr.forEach((path) => {
      /*
        If a file name is empty such as ".gitignore," extname will return an empty string.
        It will use a Regex instead as a fallback to get the true extension of that file.
        Directories will return an empty string aswell.

        Note that using extname is more performant than a Regex. We use regex just incase.
        - TBroz15
      */
      let ext = extname(path);

      if (ext === "") {
        const realExt = regexExt.exec(basename(path));

        // If its a directory
        if (realExt === null) return directories.push(path);

        // or not...
        ext = realExt[0];
      }

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

    // Distribute according to the amount of threads
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
  async copyEtc({
    inPath,
    element: etc,
  }: {
    inPath: string;
    element: string[];
  }) {
    // If array is empty, ignore it right away
    if (!etc[0]) return;

    const promises = etc.map((path) =>
      copyFile(join(inPath, path), join(temp, path))
    );

    await Promise.all(promises);
  },
  async minifyJSON({
    inPath,
    element: JSONFiles,
  }: {
    inPath: string;
    element: string[];
  }) {
    // If array is empty, ignore it right away
    if (!JSONFiles[0]) return;

    const errorList: any[] = [];

    const promises = JSONFiles.map(async (path) => {
      const filePath = join(temp, path);
      let data = readFileSync(join(inPath, path), "utf-8");
      const hash = createHash("md5").update(data).digest("hex");

      const cacheFile = join(cache, hash.concat(".json"));
      const cacheFileExists = existsSync(cacheFile);

      if (cacheFileExists) return copyFile(cacheFile, filePath);

      try {
        data = removeComments(data);
        data = JSON.parse(data);
        data = JSON.stringify(data);
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
      ) as any[];
      allErrors.push(...errorList);
      writeFileSync(errorListFile, JSON.stringify(allErrors));
    }
  },
};

const decoder = new TextDecoder();

const receiveEncodedJSON = (buffer: AllowSharedBufferSource) => {
  const jsonString = decoder.decode(buffer);
  return JSON.parse(jsonString);
};

parentPort!.on("message", async ({ buffer }) => {
  const { fn, data } = receiveEncodedJSON(buffer);
  if (typeof functions[fn] === "undefined")
    throw new Error("Function is not defined!");

  parentPort?.postMessage(await functions[fn](data));
});
