import { cpus } from "node:os";
import { existsSync, readFileSync, rmSync, statSync } from "node:fs";
import fastFolderSizeSync from "fast-folder-size/sync.js";
import { newSpinner } from "./utils/spinner.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { ThreadPool } from "./workers/thread_pool.js";
import { bold, green, italic, red, warn } from "./utils/picocolors.js";
import { fullCompileUsage, suitcaseUsage } from "./cli/onHelp.js";
import {
  clrErrorList,
  errorListFile,
  mkTemp,
  mkTempPack,
  tempPack,
} from "./utils/temp_folder.js";
import { getFiles } from "./utils/get_files.js";
import { runPromises } from "./utils/run_promises.js";
import type { JSONErrorList } from "./types/error_list.d.ts";
import AdmZip from "adm-zip";

const threads = cpus().length;

const compile = async () => {
  const { in: inPath, out: outPath } = await yargs(hideBin(process.argv))
    .options({
      in: { type: "string", alias: "i" },
      out: { type: "string", alias: "o" },
    })
    .parseAsync();

  if (!inPath || !outPath) {
    console.log(
      `  ${red(
        '"You forgot the pickles!"'
      )}\n\n${suitcaseUsage}\n${fullCompileUsage}`
    );
    process.exit(-1);
  }

  if (!existsSync(inPath)) {
    console.log(`  ${red("Directory does not exist!")}\n`);
    process.exit(-1);
  }

  const { terminate, runArray } = ThreadPool(threads);

  console.log("Starting...");

  mkTemp();
  mkTempPack();

  const start = performance.now();

  const getFilesSpinner = newSpinner("Getting all files...");
  const { JSONFiles, PNGFiles, etc } = await getFiles({ inPath, threads });
  getFilesSpinner("success", {
    text: "Finished getting all files.",
  });

  await runPromises(
    [
      runArray("copyEtc", etc, { inPath }),
      runArray("minifyJSON", JSONFiles, { inPath }),
      runArray("compressPNG", PNGFiles, { inPath }),
    ],
    ["Copy other files", "Minify JSON files", "Compress PNG files"]
  );

  terminate();

  const archive = new AdmZip();

  const compressFolderSpinner = newSpinner("Compressing Packs...");
  archive.addLocalFolder(tempPack);
  await archive.writeZipPromise(outPath, {});
  compressFolderSpinner("success", {
    text: "Successfully compressed packs.",
  });

  console.log(
    bold(
      `${green("✔")} Successfully compiled pack in ${(
        performance.now() - start
      ).toFixed(2)}ms.`
    )
  );

  try {
    const folderPackSize = (fastFolderSizeSync(inPath) as number) / 1000;
    const packSize = statSync(outPath).size / 1000;

    const howSmall = (folderPackSize / packSize).toFixed(2);

    // prettier-ignore
    console.log(`
📉 Your pack is now ${italic(`${howSmall}x smaller`)}!

   Then: ${italic(`${folderPackSize} KB`)}
   Now:  ${italic(`${packSize} KB`)}
  `);
  } catch (error) {
    if (!error) return;
    // prettier-ignore
    console.log(warn("\nFile Size Comparison is not available at that moment."));
  }

  if (existsSync(errorListFile)) {
    const errorList = JSON.parse(
      readFileSync(errorListFile, "utf-8")
    ) as JSONErrorList;

    console.log(warn("There are error(s) while minifying JSON Files."));

    errorList.forEach(({ filePath, error }) => {
      console.log(`${bold("Path :")} ${filePath}`);
      console.log(`${bold("Error:")} ${error}\n`);
    });

    clrErrorList();
  }

  const clearTempSpinner = newSpinner("Clearing Temporary Files...");
  rmSync(tempPack, { recursive: true, force: true });
  clearTempSpinner("success", {
    text: "Cleared temporary files",
  });
};

export { compile };
