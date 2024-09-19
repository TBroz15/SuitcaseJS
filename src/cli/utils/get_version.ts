import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const { version } = JSON.parse(
  readFileSync(resolve(__dirname, "../../../package.json"), "utf-8")
) as { version: string };
