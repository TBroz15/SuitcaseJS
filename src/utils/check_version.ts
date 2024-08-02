const { node, bun } = process.versions;

const isNode = typeof node !== "undefined";
const isBun = typeof bun !== "undefined";

export const getRuntime = () => {
  if (isBun) return `Bun ${bun}`;
  if (isNode) return `NodeJS ${node}`;
};
