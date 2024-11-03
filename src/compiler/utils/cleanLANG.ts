export const cleanLANG = (str: string) =>
  str
    .split("\n")
    .map((line) => line.split("##")[0].trim())
    .filter((line) => line !== "")
    .join("\n");
