import { spawnPromise } from "./promise_spawn.js";

const commands = ["npx tsc --noEmit", "npx eslint src"];

const promises = await Promise.allSettled(
  commands.map((cmd) => spawnPromise(cmd))
);

promises;
