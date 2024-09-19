// "help me" -TBroz15

import { italic, green } from "../utils/picocolors.js";
import { usage } from "../utils/usage.js";

export const suitcaseUsage = usage(
  "suitcase",
  "Used for compiling packs.",
  true,
  2
);

const helpUsage = usage(
  ["--help", "-h"],
  "Lists all of the commands and its functions.",
  false,
  4
);

const versionUsage = usage(
  ["--version", "-v"],
  "Shows the current version of SuitcaseJS and your runtime.",
  false,
  4
);

const clearCacheUsage = usage(
  ["--clear-cache", "-clr-c"],
  "Clears all of the cached files.",
  false,
  4
);

const compileUsage = usage(
  ["--compile", "-c"],
  "Starts the compilation process according to the flags.",
  true,
  4
);

const bareBonesUsage = usage(
  ["--bare-bones", "-b"],
  `If included, it non-graphically compiles the pack. ${italic(
    "May speed up the compilation process."
  )}`,
  false,
  6
);

const inUsage = usage(
  ["--in", "-i"],
  "Specify a directory of packs to be compiled.",
  "path to directory",
  6
);

const outUsage = usage(
  ["--out", "-o"],
  `Specify where will the output mcpack/zip file will be. ${italic(
    "Always include the file extension."
  )}`,
  "path to directory",
  6
);

export const fullCompileUsage = `${compileUsage}
${bareBonesUsage}
${inUsage}
${outUsage}`;

export const onHelp = () =>
  console.log(
    `${green(" ──Usage── ")}

${suitcaseUsage}
${helpUsage}
${versionUsage}
${clearCacheUsage}
${fullCompileUsage}
`
  );
