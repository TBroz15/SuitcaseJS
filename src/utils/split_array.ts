export const splitArray = (array: any[], arrayNumber: number) => {
  if (arrayNumber === 1) return [array];

  const newArr: Array<any>[] = [] as string | undefined;

  for (let i = 0; i < arrayNumber; i++) {
    newArr[i] = [];
  }

  let i = 0;
  for (const element of array) {
    newArr[i].push(element);
    i++;
    if (i === arrayNumber) i = 0;
  }

  return newArr;
};
