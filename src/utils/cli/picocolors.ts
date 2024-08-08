import pc from "picocolors";

export const { bold, cyan, italic, reset, green, blue, red, yellow } = pc;

export const warn = (text: string) => yellow(` ⚠️ ${text}\n`);
export const cmdStyle = (text: string) => italic(bold(text));
