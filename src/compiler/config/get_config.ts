import { join } from "node:path";
import { readFileSync, statSync } from "node:fs";
import { italic } from "../../cli/utils/picocolors.js";
import { defaultSuitcaseConfig } from "./default.js";

import type { Options } from "./config.ts";

let yaml: typeof import("js-yaml");

try {
  yaml = await import("js-yaml");
} catch (error) {
  void error;
}

const currentDir = process.cwd();

export const CONFIG_FILE_NAMES = new Set([
  ".suitcaserc",
  ".suitcaserc.yml",
  ".suitcaserc.yaml",
  ".suitcaserc.json",
  ".suitcase.config.yaml",
  ".suitcase.config.yml",
  ".suitcase.config.json",
]);

class Config {
  get(): string[] {
    return Array.from(CONFIG_FILE_NAMES).filter((name) =>
      this.isFile(join(currentDir, name))
    );
  }

  load(doLogErrors: boolean = false): Options {
    const config = this.get();
    let configFile;

    config.forEach((name) => {
      configFile = configLoader(name, doLogErrors);
    });

    if (configFile) return configFile;

    if (doLogErrors)
      console.warn("⚠️ No valid config found, using default config.\n");
    return defaultSuitcaseConfig;
  }

  isFile(path: string) {
    try {
      return statSync(path).isFile();
    } catch (error) {
      if (error) return false;
    }
  }
}

const tryLoadJSON = (
  path: string,
  content: string,
  doLogErrors: boolean
): unknown => {
  try {
    return JSON.parse(content);
  } catch (error: unknown) {
    if (doLogErrors)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.warn(`⚠️ Error parsing "${path}" as YAML:\n\n${error}`);
    return false;
  }
};

const tryLoadYAML = (
  path: string,
  content: string,
  doLogErrors: boolean
): unknown => {
  try {
    if (yaml) return yaml.load(content);
    if (doLogErrors)
      console.warn(
        `⚠️ Module "js-yaml" does not exist, can't parse "${path}"\n  Install it by running ${italic(
          `"npm install js-yaml"`
        )}\n`
      );
    return false;
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.warn(`⚠️ Error parsing "${path}" as YAML:\n\n${error}`);
    return false;
  }
};

export const configLoader = (path: string, doLogErrors: boolean = false) => {
  const configContent = readFileSync(path, "utf8");

  return (
    tryLoadJSON(path, configContent, doLogErrors) ||
    tryLoadYAML(path, configContent, doLogErrors)
  );
};

export default Config;
