import { cmdStyle, italic, blue } from "./picocolors.js";
import { wrapText } from "./wrap_text.js";

/* CLI READABILITY 100 */

export const usage = (
  cmds: string[] | string,
  description: string,
  flags?: string[] | string | boolean,
  indentCount: number = 0
) => {
  let usageText = "";

  if (typeof cmds !== "string") {
    const arr = cmds.map((value) => cmdStyle(value));
    usageText += blue(arr.join(", "));
  } else {
    usageText += blue(cmdStyle(cmds));
  }

  if (flags) {
    usageText += " [";

    switch (typeof flags) {
      case "boolean":
        usageText += italic("flags");
        break;
      case "string":
        usageText += italic(flags);
        break;
      case "object": {
        const arr = flags.map((value) => italic(value));
        usageText += arr.join(", ");
        break;
      }
    }

    usageText += `]`;
  }

  usageText += `\n${description}`;
  return wrapText(usageText, indentCount);
};
