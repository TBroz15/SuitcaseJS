import { existsSync, mkdirSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export const tempFolder = join(homedir(), ".suitcase");

export const cache = join(tempFolder, "cache");
export const tempPack = join(tempFolder, "temp");
export const errorListFile = join(tempFolder, "error_list.json");

export const mkTemp = () => {
  if (!existsSync(cache)) mkdirSync(cache);
};

export const mkTempPack = () => {
  if (existsSync(tempPack)) rmSync(tempPack, { recursive: true, force: true });
  mkdirSync(tempPack);
};
