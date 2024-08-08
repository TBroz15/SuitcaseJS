import { newSpinner } from "../utils/cli/spinner.js";
import { cache } from "../utils/compiler/temp_folder.js";
import { rm } from "fs/promises";

export const clearCache = async () => {
  const clearTempSpinner = newSpinner("Clearing cached files...");
  await rm(cache, { recursive: true, force: true });
  clearTempSpinner("success", {
    text: "Cleared cached files",
  });
};
