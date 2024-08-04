interface Functions {
  getFiles({ inPath }: { inPath: string }): Promise<{
    JSONFiles: unknown[][];
    etc: unknown[][];
  }>;
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
