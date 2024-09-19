import { existsSync } from "fs";
import { red } from "../utils/picocolors.js";
import { suitcaseUsage, fullCompileUsage } from "../onHelp.js";
import { Suitcase } from "../../index.js";
import { bold, green } from "../utils/picocolors.js";

export const bareBones = async (inPath: string, outPath: string) => {
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

  const sc = await new Suitcase(inPath).readConfig().compile(outPath);
  const getStats = await sc.finish();

  const { compileTime } = await getStats();

  const log = `${green(
    "✔"
  )} Successfully compiled ${inPath} in ${compileTime.toFixed(2)}ms.\n`;

  console.log(bold(log));
};
