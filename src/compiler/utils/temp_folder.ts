import { existsSync, rmSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

export const tempFolder = join(homedir(), ".suitcase");

export const cache = join(tempFolder, "cache");
export const tempPack = join(tempFolder, "temp");
export const errorListFile = join(tempFolder, "error_list.json");

export const mkTemp = () => {
  if (!existsSync(cache)) return mkdir(cache, { recursive: true });
};

export const mkTempPack = () => {
  if (existsSync(tempPack)) rmSync(tempPack, { recursive: true, force: true });
  return mkdir(tempPack);
};

/**
 * I know the name of the function is weird...
 *
 * This creates a directory that was not existed. To prevent potential errors on compression.
 *
 * *Now chill the living being out!* -TBroz15.
 */
export const mkOut = (path: string) => {
  const dir = dirname(path);
  if (!existsSync(dir)) return mkdir(dir, { recursive: true });
};

export const clrErrorList = () => rmSync(errorListFile);
