#!/usr/bin/env node

// pain -TBroz15

import { onHelp } from "./modes/on_help.js";
import { italic } from "./utils/picocolors.js";
import { version } from "./utils/get_version.js";
import { getRuntime } from "./utils/get_runtime.js";
import { clearCache } from "./modes/clear_cache.js";
import { compile } from "./modes/compile/normal.js";
import { bareBones } from "./modes/compile/bare_bones.js";

import mri from "mri";
import { initConfig } from "./modes/init_config.js";

console.log(`
 💼 Suitcase.js ${italic(`v${version}`)}
`);

switch (process.argv[2]) {
  case "v":
  case "version":
    console.log(` Using ${getRuntime()}\n`);
    break;

  case "i":
  case "init":
    await initConfig();
    break;

  case "c":
  case "compile": {
    const {
      in: inPath,
      out: outPath,
      "bare-bones": isBareBones,
    } = mri(process.argv.slice(2), {
      alias: {
        in: "i",
        out: "o",
        "bare-bones": "b",
      },
    }) as { in: string; out: string; "bare-bones": boolean };

    if (isBareBones) {
      await bareBones(inPath, outPath);
      break;
    }

    await compile(inPath, outPath);
    break;
  }

  case "clr-c":
  case "clear-cache":
    await clearCache();
    break;

  case "h":
  case "help":
  default:
    onHelp();
    break;
}
