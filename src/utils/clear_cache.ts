import { rmSync } from "fs";
import { newSpinner } from "./spinner.js";
import { cache } from "./temp_folder.js";

export const clearCache = () => {
  const clearTempSpinner = newSpinner("Clearing cached files...");
  rmSync(cache, { recursive: true, force: true });
  clearTempSpinner("success", {
    text: "Cleared cached files",
  });
};
