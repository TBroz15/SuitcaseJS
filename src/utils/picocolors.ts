import pc from "picocolors";

export const { bold, cyan, italic, reset, green, blue, red } = pc;
export const cmdStyle = (text: string) => italic(bold(text));
