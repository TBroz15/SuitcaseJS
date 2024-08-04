import { load as parseYaml } from "js-yaml";
import fs from "node:fs";
import path from "node:path";

export const CONFIG_FILE_NAMES = [
  ".suitcaserc",
  ".suitcaserc.yaml",
  ".suitcaserc.yml",
  "suitcase.config.yaml",
  "suitcase.config.yml",
];

class Config {
  get_config = () => {
    const files: string[] = [];
    CONFIG_FILE_NAMES.forEach((name) => {
      if (this.isFile(process.cwd() + "/" + name)) {
        files.push(name);
      }
    });
    return files;
  };

  load_config = (): string | undefined => {
    const config = this.get_config();
    let configFile;
    config.forEach((name) => {
      const { ext: extension } = path.parse(name);
      const loader = loaders[extension];
      if (loader) configFile = loader(name);
    });
    return configFile;
  };

  isFile(path: string) {
    try {
      fs.statSync(path);
      return true;
    } catch (error) {
      if (error) return false;
    }
  }
}

const loaders: Record<string, (path: string) => unknown> = {
  ".yaml"(path: string): unknown {
    const content = fs.readFileSync(path, "utf8");
    try {
      return parseYaml(content);
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.error(`Error parsing ${path} as YAML: ${error}`);
    }
  },
  ".yml"(path: string): unknown {
    return loaders[".yaml"](path);
  },
  ""(path: string): unknown {
    return loaders[".yaml"](path);
  },
};

export default Config;
