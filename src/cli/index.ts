#!/usr/bin/env node

// pain -TBroz15

import { onHelp } from "./commands/onHelp.js";
import { italic } from "./utils/picocolors.js";
import { version } from "./utils/getVersion.js";
import { getRuntime } from "./utils/getRuntime.js";
import { clearCache } from "./commands/clearCache.js";
import { compile } from "./commands/compile/normal.js";
import { bareBones } from "./commands/compile/bareBones.js";

import mri from "mri";
import { initConfig } from "./commands/initConfig.js";

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
      config,
    } = mri(process.argv.slice(2), {
      alias: {
        in: "i",
        out: "o",
        "bare-bones": "b",
        config: "c",
      },
    }) as { in: string; out: string; "bare-bones": boolean; config?: string };

    if (isBareBones) {
      await bareBones(inPath, outPath, config);
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
