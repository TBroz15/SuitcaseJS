import type { CompilerConf } from "./config.d.ts";

export type FN = ({
  inPath,
  element,
}: {
  inPath: string;
  element: string[];
}) => Promise<void>;

export type WorkerData = {
  compilerConfig: CompilerConf;
  cache: string;
  temp: string;
};

export type FunctionNames = "copyEtc" | "minifyJSON" | "compressPNG";

export interface WorkerFunctions {
  [key: string]: FN;
}
