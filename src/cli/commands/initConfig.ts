import { number } from "../utils/clack.js";
import { bgCyan, bold, italic } from "../utils/picocolors.js";
import { defaultSuitcaseConfig } from "../../compiler/config/defaultSuitcaseConfig.js";
import {
  confirm as _confirm,
  ConfirmOptions,
  intro,
  log,
  outro,
} from "@clack/prompts";

import type { NumberRange } from "../../compiler/config/types/NumberRange.js";
import { writeFile } from "fs/promises";

const info = (text: string) => log.info(bold(text));
const confirm = (ops: ConfirmOptions) => _confirm(ops) as Promise<boolean>;

export const initConfig = async () => {
  const config = defaultSuitcaseConfig;

  intro(bgCyan(" Initialize Config "));

  info("JSON Files");
  config.compiler.JSON.minify = await confirm({
    message: "Enable minification?",
  });

  info("LANG Files");
  config.compiler.LANG.minify = await confirm({
    message: "Enable minification?",
  });

  info("PNG Files");
  config.compiler.PNG.compress = await confirm({
    message: "Enable compression?",
  });
  if (config.compiler.PNG.compress) {
    config.compiler.PNG.compressionLevel = (await number(
      { message: "Compression Level", initialValue: "9" },
      0,
      9
    )) as NumberRange<0, 9>;
    config.compiler.PNG.quality = (await number(
      { message: "Image Quality", initialValue: "100" },
      1,
      100
    )) as NumberRange<1, 100>;
  }

  info("JPG Files");
  config.compiler.JPG.compress = await confirm({
    message: "Enable compression?",
  });
  if (config.compiler.JPG.compress) {
    config.compiler.JPG.progressive = await confirm({
      message: `Enable progressive scan? ${italic(
        "Makes images accurate, but a bit large file size."
      )}`,
      initialValue: true,
    });
    config.compiler.JPG.quality = (await number(
      { message: "Image Quality", initialValue: "100" },
      1,
      100
    )) as NumberRange<1, 100>;
  }

  info("Other Stuff");
  config.compiler.withCaching = await confirm({
    message: `Enable Caching? ${italic("Speeds up the overall compilation.")}`,
    initialValue: true,
  });

  await writeFile("./.suitcaserc", JSON.stringify(config, null, 3));

  outro(`${italic(".suitcaserc")} is created!`);
};
