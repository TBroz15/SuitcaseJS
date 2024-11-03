import { IgnoreConfig } from "./IgnoreConfig.js";
import { JPGOptions } from "./JPGOptions.js";
import { JSONOptions } from "./JSONOptions.js";
import { LANGOptions } from "./LANGOptions.js";
import { PNGOptions } from "./PNGOptions.js";

export interface Options {
  ignore: IgnoreConfig;
  compiler: {
    JSON: JSONOptions;
    LANG: LANGOptions;
    PNG: PNGOptions;
    JPG: JPGOptions;
    withCaching: boolean;
  };
}
