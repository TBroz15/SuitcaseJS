export const chunkArray = (array: unknown[], arrayNumber: number) => {
  // If array is absolutely empty then don't chunk!
  if (!array[0]) return [];
  if (arrayNumber === 1) return [array];

  const chunkedArray: Array<unknown>[] = [];

  const size = array.length / arrayNumber;

  // Round the number if its a float.
  const intSize = Number.isInteger(size) ? size : parseInt(size.toFixed()) + 1;

  for (let i = 0; i < array.length; i += intSize)
    chunkedArray.push(array.slice(i, i + intSize));

  for (let i = 0; i < arrayNumber; i++)
    if (typeof chunkedArray[i] === "undefined") chunkedArray.splice(i, 1);

  return chunkedArray;
};
