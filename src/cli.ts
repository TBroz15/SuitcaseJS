#!/usr/bin/env node

// pain -TBroz15

import { compile } from "./compiler.js";
import { onHelp } from "./cli/onHelp.js";
import { italic } from "./utils/picocolors.js";
import { getRuntime } from "./utils/check_version.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { version } = JSON.parse(
  readFileSync(resolve(__dirname, "../package.json"), "utf-8")
);

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

  case "-h":
  case "--help":
  default:
    onHelp();
    break;
}
