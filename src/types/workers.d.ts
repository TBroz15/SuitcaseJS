export type FN = ({
  inPath,
  element,
}: {
  inPath: string;
  element: string[];
}) => Promise<void>;

export type FunctionNames = "copyEtc" | "minifyJSON" | "compressPNG";

export interface WorkerFunctions {
  [key: string]: FN;
}
