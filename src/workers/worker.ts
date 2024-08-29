import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parentPort, workerData } from "node:worker_threads";
import { createHash } from "node:crypto";
import { errorListFile } from "../utils/compiler/temp_folder.js";
import { copyFile } from "node:fs/promises";
import type { JSONErrorList } from "../types/error_list.d.ts";
import type { WorkerData, WorkerFunctions } from "../types/workers.d.ts";
import sharp from "sharp";
import { PNG } from "../utils/compiler/default_config.js";
import { promiseAllUnhandled } from "../utils/compiler/promise_all_unhandled.js";
import JSONC from "jsonc-parser";

const { cache, temp, compilerConfig } = workerData as WorkerData;

// TODO: Reduce some repeated code

const functions: WorkerFunctions = {
  async copyEtc({ inPath, element: etc }) {
    // If array is empty, ignore it right away
    if (!etc[0]) return;

    const promises = etc.map((path) =>
      copyFile(join(inPath, path), join(temp, path))
    );

    await promiseAllUnhandled(promises);
  },
  async minifyJSON({ inPath, element: JSONFiles }) {
    // If array is empty, ignore it right away
    if (!JSONFiles[0]) return;

    const errorList: JSONErrorList = [];

    const promises = JSONFiles.map((path) => {
      const tempPath = join(temp, path);
      const filePath = join(inPath, path);

      let data = readFileSync(filePath, "utf-8");
      const hash = createHash("md5").update(data).digest("hex");

      const cacheFile = join(cache, hash.concat(".json"));
      const cacheFileExists = existsSync(cacheFile);

      if (!cacheFileExists) {
        if (compilerConfig.JSON?.errorChecking) {
          try {
            data = JSONC.stripComments(data);
            data = JSON.parse(data) as unknown as string; // epic bypass
          } catch (error) {
            errorList.push({
              error: (error as Error).toString(),
              filePath,
            });
          }
        } else {
          data = JSONC.parse(data) as unknown as string; // epic bypass 2: Electric Boogaloo
        }

        writeFileSync(cacheFile, JSON.stringify(data));
      }

      return copyFile(cacheFile, tempPath);
    });

    await promiseAllUnhandled(promises);

    if (!(compilerConfig.JSON?.errorChecking && errorList[0])) return;

    if (!existsSync(errorListFile)) writeFileSync(errorListFile, "[]");

    const allErrors = JSON.parse(
      readFileSync(errorListFile, "utf-8")
    ) as JSONErrorList;
    allErrors.push(...errorList);

    writeFileSync(errorListFile, JSON.stringify(allErrors));
  },
  async compressPNG({ inPath, element: PNGFiles }) {
    // If array is empty, ignore it right away
    if (!PNGFiles[0]) return;

    const promises = PNGFiles.map(async (path) => {
      const tempPath = join(temp, path);
      const filePath = join(inPath, path);

      const buffer = readFileSync(filePath);
      const hash = createHash("md5").update(buffer).digest("hex");

      const cacheFile = join(cache, hash.concat(".png"));
      const cacheFileExists = existsSync(cacheFile);

      if (!cacheFileExists) await sharp(filePath).png(PNG).toFile(cacheFile);

      return copyFile(cacheFile, tempPath);
    });

    await promiseAllUnhandled(promises);
  },
  // async compressJPG({ inPath, element: PNGFiles }) {},
};

const decoder = new TextDecoder();

const receiveEncodedJSON = (buffer: ArrayBuffer) => {
  const jsonString = decoder.decode(buffer);
  return JSON.parse(jsonString) as object | never[];
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
parentPort!.on("message", async ({ buffer }) => {
  const { fn, data } = receiveEncodedJSON(buffer as ArrayBuffer) as {
    fn: keyof WorkerFunctions;
    data: never;
  };

  if (typeof functions[fn] === "undefined")
    throw new Error("Function is not defined!");

  parentPort?.postMessage(await functions[fn](data));
});
