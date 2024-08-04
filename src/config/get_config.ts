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

  load_config = (): string | undefined=> {
    const config = this.get_config();
    let configFile;
    config.forEach((name) => {
      const { base: fileName, ext: extension } = path.parse(name);
      const loader = loaders[extension];
      if (loader) {
        configFile = loader(name);
      }
    });
    return configFile;
  };

  isFile(path: string) {
    try {
      fs.statSync(path);
      return true;
    } catch (error) {
      return false;
    }
  }
}

const loaders: Record<string, (path: string) => any> = {
  ".yaml"(path: string): any {
    const content = fs.readFileSync(path, "utf8");
    try {
      return parseYaml(content);
    } catch (error) {
      console.error(`Error parsing ${path} as YAML: ${error}`);
    }
  },
  ".yml"(path: string): any {
    return loaders[".yaml"](path);
  },
  ""(path: string): any {
    return loaders[".yaml"](path);
  },
};

export default Config;
