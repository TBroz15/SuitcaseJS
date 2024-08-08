#!/usr/bin/env node

// pain -TBroz15

import { compile } from "./compiler.js";
import { onHelp } from "./cli/onHelp.js";
import { italic } from "./utils/cli/picocolors.js";
import { getRuntime } from "./utils/cli/get_runtime.js";
import { clearCache } from "./cli/clear_cache.js";
import { version } from "./utils/cli/get_version.js";

console.log(`
 💼 Suitcase.js ${italic(`v${version}`)}
`);

switch (process.argv[2]) {
  case "-v":
  case "--version":
    console.log(` Using ${getRuntime()}\n`);
    break;

  case "-c":
  case "--compile":
    await compile();
    break;

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
