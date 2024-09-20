import { text } from "@clack/prompts";
import type { TextOptions } from "@clack/prompts";
import type { NumberRange } from "../../compiler/config/config.d.ts";

const isInRange = (n: string | number, min: number, max: number) => {
  if (typeof n === "string") n = Number.parseInt(n);
  if (Number.isNaN(n)) return "Invalid Number!";

  if (n >= min && n <= max) return undefined;
  return `Number ${n} is outside of ${min} to ${max}!`;
};

export const number = async (
  ops: TextOptions,
  min: number,
  max: number
): Promise<NumberRange<typeof min, typeof max>> => {
  const parsedNumber = Number.parseInt(
    (await text({
      ...ops,
      validate: (value: string) => isInRange(value, min, max),
    })) as string
  );
  if (Number.isNaN(parsedNumber)) {
    throw new Error("Failed to parse input as a number!");
  }
  if (!Number.isInteger(parsedNumber))
    throw new Error("Parsed number is not an integer!");
  return parsedNumber;
};
