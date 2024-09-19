import sharp from "sharp";
import { join } from "path";
import JSONC from "jsonc-parser";
import { createHash } from "crypto";
import { copyFile, writeFile } from "fs/promises";
import { PNG } from "../utils/compiler/default_config.js";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { workerData as _WD, parentPort } from "worker_threads";

import { tempPack, cache } from "../utils/compiler/temp_folder.js";
import { promiseAllUnhandled } from "../utils/compiler/promise_all_unhandled.js";

import type { WorkerData } from "../types/workers.d.ts";

// For proper type checking and to nullify some data...
const {
  compilerConfig: { compiler },
  files,
  inPath,
} = _WD as WorkerData;
const errorList: unknown[] = [];

const checkParseJSON = (data: string, filePath: string): unknown => {
  try {
    return JSON.parse(JSONC.stripComments(data));
  } catch (error) {
    errorList.push({
      error: (error as Error).toString(),
      filePath,
    });
    return false;
  }
};

function minifyJSON() {
  if (files.JSON.length === 0) return;
  const { errorChecking } = compiler.JSON ?? { errorChecking: false };

  const promises = files.JSON.map((path) => {
    const tempPath = join(tempPack, path);
    const filePath = join(inPath, path);

    const data = readFileSync(filePath, "utf-8");
    const hash = createHash("md5").update(data).digest("hex");

    const cacheFile = join(cache, hash.concat(".json"));
    const cacheFileExists = existsSync(cacheFile);

    if (!cacheFileExists) {
      const parsedJSON: unknown = errorChecking
        ? checkParseJSON(data, filePath)
        : JSONC.parse(data);

      if (!parsedJSON) return;

      if (!compiler.withCaching)
        return writeFile(tempPath, JSON.stringify(data));

      writeFileSync(cacheFile, JSON.stringify(parsedJSON));
    }

    return copyFile(cacheFile, tempPath);
  });

  // @ts-expect-error Help out garbage collector
  files.JSON = null;

  return promiseAllUnhandled(promises);
}

function compressPNG() {
  if (files.PNG.length === 0) return;

  const promises = files.PNG.map(async (path) => {
    const tempPath = join(tempPack, path);
    const filePath = join(inPath, path);

    const buffer = readFileSync(filePath);
    const hash = createHash("md5").update(buffer).digest("hex");

    const cacheFile = join(cache, hash.concat(".png"));
    const cacheFileExists = existsSync(cacheFile);

    if (!cacheFileExists) {
      if (!compiler.withCaching)
        return sharp(filePath).png(PNG).toFile(tempPath);

      await sharp(filePath).png(PNG).toFile(cacheFile);
    }

    return copyFile(cacheFile, tempPath);
  });

  // @ts-expect-error Help out garbage collector
  files.PNG = null;

  return promiseAllUnhandled(promises);
}

void (await Promise.all([minifyJSON(), compressPNG()]));
parentPort?.postMessage(errorList);
