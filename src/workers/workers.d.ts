interface Functions {
  copyEtc({
    inPath,
    element,
  }: {
    inPath: string;
    element: string[];
  }): Promise<void>;
  minifyJSON({
    inPath,
    element,
  }: {
    inPath: string;
    element: string[];
  }): Promise<void>;
}
