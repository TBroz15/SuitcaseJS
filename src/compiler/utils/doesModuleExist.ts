export const doesModuleExist = (moduleName: string) => {
  try {
    import.meta.resolve(moduleName);
    return true;
  } catch (error) {
    void error;
    return false;
  }
};
