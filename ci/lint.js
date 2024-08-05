import { runCommands } from "./promise_spawn.js";

export const lintCmds = [
  ["npx", "tsc", "--noEmit"],
  ["npx", "eslint", "src"],
];

await runCommands(lintCmds);
