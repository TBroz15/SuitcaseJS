import { cpus } from "node:os";
import { createWriteStream, existsSync, rmSync, statSync } from "node:fs";
import fastFolderSizeSync from "fast-folder-size/sync.js";
import { newSpinner } from "./utils/spinner.js";
import archiver from "archiver";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { ThreadPool } from "./workers/thread_pool.js";
import { bold, green, italic, red } from "./utils/picocolors.js";
import { fullCompileUsage, suitcaseUsage } from "./cli/onHelp.js";
import { mkTemp, mkTempPack, tempPack } from "./utils/temp_folder.js";

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

  const { terminate, run, runArray } = ThreadPool(threads);

  console.log("Starting...");

  mkTemp();
  mkTempPack();

  const start = performance.now();

  const { JSONFiles, etc } = (await run("Getting all files", "getFiles", {
    inPath,
  })) as { JSONFiles: string[]; etc: string[] };

  await Promise.all([
    runArray("Copying other files", "copyEtc", etc, { inPath }),
    runArray("Minifying JSON files", "minifyJSON", JSONFiles, { inPath }),
  ]);

  terminate();

  const outputFolder = createWriteStream(outPath, { autoClose: true });

  const archive = archiver("zip", {
    zlib: {
      level: 9,
      windowBits: 15,
      memLevel: 9,
    },
    statConcurrency: threads,
  });

  archive.pipe(outputFolder);

  archive.directory(tempPack, false);

  const compressFolderSpinner = newSpinner("Compressing Packs...");
  await archive.finalize();
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
    if (error)
      console.log("  File Size Comparison is not available at that moment.");
  }

  const clearTempSpinner = newSpinner("Clearing Temporary Files...");
  rmSync(tempPack, { recursive: true, force: true });
  clearTempSpinner("success", {
    text: "Cleared temporary files",
  });
};

export { compile };
