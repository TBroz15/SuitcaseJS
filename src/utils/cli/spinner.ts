import type { Options, Spinner } from "nanospinner";
import { createSpinner } from "nanospinner";
import { italic } from "./picocolors.js";

const newSpinner = (text: string, options?: Options) => {
  const spinner = createSpinner(text, options).start();
  const start = performance.now();

  return (
    instance: keyof Spinner,
    options: { text?: string; mark?: string; color?: string }
  ) => {
    switch (instance) {
      case "reset":
      case "clear":
      case "spin":
        return spinner[instance]();
      case "success":
      default: {
        const end = (performance.now() - start).toFixed(2);
        options.text += ` (${italic(end)}ms)`;
        return spinner[instance](options);
      }
    }
  };
};

export { newSpinner };
