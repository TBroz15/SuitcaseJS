import { fdir } from "fdir";
import { rmSync } from "fs";
import { newSpinner } from "./utils/spinner.js";
import { cache } from "./utils/temp_folder.js";

export const clearCache = async () => {
  const clearTempSpinner = newSpinner("Clearing cached files...");
  rmSync(cache, { recursive: true, force: true });
  clearTempSpinner("success", {
    text: "Cleared cached files",
  });
};
