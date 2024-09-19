import type { Options } from "./config.d.ts";

export type FN = ({
  inPath,
  element,
}: {
  inPath: string;
  element: string[];
}) => Promise<void>;

export type WorkerData = {
  compilerConfig: Options;
  inPath: string;
  files: {
    JSON: string[];
    PNG: string[];
  };
};

export type FunctionNames = "copyEtc" | "minifyJSON" | "compressPNG";

export interface WorkerFunctions {
  [key: string]: FN;
}
