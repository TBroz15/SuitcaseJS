// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const promiseAllUnhandled = async (promises: any) => {
  try {
    void (await Promise.all(promises));
  } catch (error) {
    void error;
  }
};
