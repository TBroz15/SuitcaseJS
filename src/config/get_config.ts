import { load as parseYaml } from "js-yaml";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { defaultSuitcaseConfig } from "./default.js";
import { SuitcaseConfig } from "../types/config.js";

const currentDir = process.cwd();

export const CONFIG_FILE_NAMES = [
  ".suitcaserc",
  ".suitcaserc.yml",
  ".suitcaserc.yaml",
  ".suitcaserc.json",
  ".suitcase.config.yaml",
  ".suitcase.config.yml",
  ".suitcase.config.json",
];

class Config {
  get(): string[] {
    return CONFIG_FILE_NAMES.filter((name) =>
      this.isFile(join(currentDir, name))
    );
  }

  load(): SuitcaseConfig {
    const config = this.get();
    let configFile;

    config.forEach((name) => {
      configFile = configLoader(name);
    });

    if (!configFile) {
      console.warn("⚠️ No valid config found, using default config.");
      return defaultSuitcaseConfig;
    } else return configFile;
  }

  isFile(path: string) {
    try {
      return statSync(path).isFile();
    } catch (error) {
      if (error) return false;
    }
  }
}

const tryLoadJSON = (content: string): unknown => {
  try {
    return JSON.parse(content);
  } catch (error: unknown) {
    if (!error) return;
    return false;
  }
};

const tryLoadYAML = (path: string, content: string): unknown => {
  try {
    return parseYaml(content);
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.warn(`⚠️ Error parsing "${path}" as YAML:\n\n${error}`);
    return false;
  }
};

const configLoader = (path: string) => {
  const configContent = readFileSync(path, "utf8");

  return tryLoadJSON(configContent) || tryLoadYAML(path, configContent);
};

export default Config;
