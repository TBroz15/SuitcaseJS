import { existsSync } from "node:fs";
import { newSpinner } from "../utils/spinner.js";

import { bold, green, italic, red } from "../utils/picocolors.js";
import { fullCompileUsage, suitcaseUsage } from "../onHelp.js";
import { Suitcase } from "../../index.js";

export const compile = async (inPath: string, outPath: string) => {
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

  console.log(`${bold("Compiling")} ${italic(inPath)}...\n`);

  const sc = new Suitcase(inPath).readConfig(undefined, true);

  const getFilesSpinner = newSpinner("Getting all files...");
  await sc.setup(outPath);
  getFilesSpinner("success", {
    text: "Finished getting all files.",
  });

  const compilingSpinner = newSpinner("Compiling all files...");
  await sc.compileFiles();
  compilingSpinner("success", { text: "Finished compiling all files." });

  const compressFolderSpinner = newSpinner("Compressing pack...");
  sc.zipFolder();
  compressFolderSpinner("success", {
    text: "Successfully compressed pack.",
  });

  const clearTempSpinner = newSpinner("Clearing temporary files...");
  const getStats = await sc.finalize().finish();
  clearTempSpinner("success", {
    text: "Cleared temporary files",
  });

  const { compileTime, before, after } = await getStats();

  console.log(
    bold(
      `${green("✔")} Successfully compiled pack in ${compileTime.toFixed(2)}ms.`
    )
  );

  const folderPackSize = (before as number) / 1000;
  const packSize = (after as number) / 1000;

  const howSmall = (folderPackSize / packSize).toFixed(2);

  // prettier-ignore
  console.log(`
📉 Your pack is now ${italic(`${howSmall}x smaller`)}!

   Then: ${italic(`${folderPackSize} KB`)}
   Now:  ${italic(`${packSize} KB`)}
  `);
};
