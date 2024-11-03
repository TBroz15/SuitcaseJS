// "help me" -TBroz15

import { italic, green } from "../utils/picocolors.js";
import { usage } from "../utils/usage.js";

export const suitcaseUsage = usage(
  ["suitcasejs", "suitcase", "sjs"],
  "Used for compiling packs.",
  true,
  2
);

const helpUsage = usage(
  ["help", "h"],
  "Lists all of the commands and its functions.",
  false,
  4
);

const versionUsage = usage(
  ["version", "v"],
  "Shows the current version of SuitcaseJS and your runtime.",
  false,
  4
);

const clearCacheUsage = usage(
  ["clear-cache", "clr-c"],
  "Clears all of the cached files.",
  false,
  4
);

const initConfigUsage = usage(
  ["init", "i"],
  "Creates a config through prompts.",
  false,
  4
);

const compileUsage = usage(
  ["compile", "c"],
  "Starts the compilation process according to the flags.",
  true,
  4
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
    "Always include the (.mcpack/.zip) file extension."
  )}`,
  "path to mcpack/zip",
  6
);

const configUsage = usage(
  ["--config", "-c"],
  `Specify the path to the config.`,
  "path to config",
  6, true
);

const bareBonesUsage = usage(
  ["--bare-bones", "-b"],
  `Non-graphically compiles the pack. ${italic(
    "May speed up the compilation process."
  )}`,
  false, 6, true
);

export const fullCompileUsage = `${compileUsage}
${inUsage}
${outUsage}
${configUsage}
${bareBonesUsage}`;

export const onHelp = () =>
  console.log(
    `${green(" ──Usage── ")}

${suitcaseUsage   }
${helpUsage       }
${versionUsage    }
${clearCacheUsage }
${initConfigUsage }
${fullCompileUsage}
`
  );
