export const splitArray = (array: unknown[], arrayNumber: number) => {
  if (arrayNumber === 1) return [array];

  const newArr: Array<unknown>[] = [];

  for (let i = 0; i < arrayNumber; i++) {
    newArr[i] = [];
  }

  let i = 0;
  for (const element of array) {
    newArr[i].push(element);
    i++;
    if (i === arrayNumber) i = 0;
  }

  return newArr.filter((value) => typeof value[0] !== "undefined");
};
