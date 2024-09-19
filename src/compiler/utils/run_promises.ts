import { bold } from "../../cli/utils/picocolors.js";
import { newSpinner } from "../../cli/utils/spinner.js";

/*
    To be honest,
    the outside is quite readable,
    but the inside makes your brain unavailable.

    Haiku by TBroz15.

    Seriously... PR is welcome for this function!
*/

export const runPromises = async (
  promises: Promise<unknown>[],
  taskNames: string[]
) => {
  const text = taskNames.map((value) => `├─ ${value}`);
  text[text.length - 1] = `╰─ ${taskNames.at(-1)}`;
  let joined = text.join("\n");

  const spinner = newSpinner(`${bold("Running multiple tasks...")}\n${joined}`);

  await Promise.all(promises);

  text[text.length - 1] = `├─ ${taskNames.at(-1)}\n╰─`;
  joined = text.join("\n");

  spinner("success", {
    text: `${bold("Finished running multiple tasks.")}\n${joined}`,
  });
};
