#!/usr/bin/env node

// pain -TBroz15

import { compile } from "./modes/normal.js";
import { onHelp } from "./onHelp.js";
import { italic } from "./utils/picocolors.js";
import { getRuntime } from "./utils/get_runtime.js";
import { clearCache } from "./modes/clear_cache.js";
import { version } from "./utils/get_version.js";
import mri from "mri";
import { bareBones } from "./modes/bare_bones.js";

console.log(`
 💼 Suitcase.js ${italic(`v${version}`)}
`);

switch (process.argv[2]) {
  case "-v":
  case "--version":
    console.log(` Using ${getRuntime()}\n`);
    break;

  case "-c":
  case "--compile": {
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

  case "-clr-c":
  case "--clear-cache":
    await clearCache();
    break;

  case "-h":
  case "--help":
  default:
    onHelp();
    break;
}
