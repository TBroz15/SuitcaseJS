import sharp from "sharp";
import { join } from "path";
import JSONC from "jsonc-parser";
import { createHash } from "crypto";
import { copyFile, writeFile } from "fs/promises";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { workerData as _WD, parentPort } from "worker_threads";

import { tempPack, cache } from "../utils/temp_folder.js";
import { promiseAllUnhandled } from "../utils/promiseAllUnhandled.js";

import type { Options } from "../config/types/Options.js";
import { cleanLANG } from "../utils/cleanLANG.js";

export type WorkerData = {
  compilerConfig: Options;
  inPath: string;
  files: {
    JSON: string[];
    LANG: string[];
    PNG: string[];
    JPG: string[];
  };
};

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

      const compiledJSON = JSON.stringify(parsedJSON);

      if (!compiler.withCaching) return writeFile(tempPath, compiledJSON);

      writeFileSync(cacheFile, compiledJSON);
    }

    return copyFile(cacheFile, tempPath);
  });

  // @ts-expect-error Help out garbage collector
  files.JSON = null;

  return promiseAllUnhandled(promises);
}

function compressPNG() {
  if (files.PNG.length === 0) return;
  const PNGConfig = compiler.PNG;
  delete PNGConfig.compress;

  const promises = files.PNG.map(async (path) => {
    const tempPath = join(tempPack, path);
    const filePath = join(inPath, path);

    const buffer = readFileSync(filePath);
    const hash = createHash("md5").update(buffer).digest("hex");

    const cacheFile = join(cache, hash.concat(".png"));
    const cacheFileExists = existsSync(cacheFile);

    if (!cacheFileExists) {
      const sharpPNG = sharp(filePath).png(PNGConfig);

      if (!compiler.withCaching) return sharpPNG.toFile(tempPath);
      await sharpPNG.toFile(cacheFile);
    }

    return copyFile(cacheFile, tempPath);
  });

  // @ts-expect-error Help out garbage collector
  files.PNG = null;

  return promiseAllUnhandled(promises);
}

function compressJPG() {
  if (files.JPG.length === 0) return;
  const JPGConfig = { ...compiler.JPG, ...{ mozjpeg: true } };
  delete JPGConfig.compress;

  const promises = files.JPG.map(async (path) => {
    const tempPath = join(tempPack, path);
    const filePath = join(inPath, path);

    const buffer = readFileSync(filePath);
    const hash = createHash("md5").update(buffer).digest("hex");

    const cacheFile = join(cache, hash.concat(".jpg"));
    const cacheFileExists = existsSync(cacheFile);

    if (!cacheFileExists) {
      const sharpJPG = sharp(filePath).jpeg(JPGConfig);

      if (!compiler.withCaching) return sharpJPG.toFile(tempPath);
      await sharp(filePath).jpeg(JPGConfig).toFile(cacheFile);
    }

    return copyFile(cacheFile, tempPath);
  });

  // @ts-expect-error Help out garbage collector
  files.JPG = null;

  return promiseAllUnhandled(promises);
}

function minifyLANG() {
  if (files.LANG.length === 0) return;

  const promises = files.LANG.map((path) => {
    const tempPath = join(tempPack, path);
    const filePath = join(inPath, path);

    const data = readFileSync(filePath, "utf-8");
    const hash = createHash("md5").update(data).digest("hex");

    const cacheFile = join(cache, hash.concat(".json"));
    const cacheFileExists = existsSync(cacheFile);

    if (!cacheFileExists) {
      const compiledLANG = cleanLANG(data);

      if (!compiler.withCaching) return writeFile(tempPath, compiledLANG);
      writeFileSync(cacheFile, compiledLANG);
    }

    return copyFile(cacheFile, tempPath);
  });

  // @ts-expect-error Help out garbage collector
  files.LANG = null;

  return promiseAllUnhandled(promises);
}

void (await Promise.all([
  minifyJSON(),
  compressPNG(),
  minifyLANG(),
  compressJPG(),
]));
parentPort?.postMessage(errorList);
