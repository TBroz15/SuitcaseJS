import { resolve } from "path";
import { Worker } from "node:worker_threads";

import type { Options } from "../config/config.d.ts";

// interface ThreadError {
//   error: string;
//   filePath: string;
// }

export class ThreadPool {
  protected promises: Promise<unknown>[] = [];

  constructor(
    threads: number,
    inPath: string,
    files: {
      JSONFiles: unknown[][];
      PNGFiles: unknown[][];
      JPGFiles: unknown[][];
    },
    compilerConfig: Options
  ) {
    const workerFile = resolve(import.meta.dirname, "worker.js");

    for (let i = 0; i < threads; i++) {
      const worker = new Worker(workerFile, {
        workerData: {
          inPath,
          files: {
            JSON: files.JSONFiles[i] ?? [],
            PNG: files.PNGFiles[i] ?? [],
            JPG: files.JPGFiles[i] ?? [],
          },
          compilerConfig,
        },
      });

      // Once all work is done by the threads, clean up some stuff...
      const promise = new Promise((resolve) => {
        worker?.once("message", (result) => {
          resolve(result);
          void worker.terminate();
        });
      });

      this.promises.push(promise);
    }
  }

  async finalize() {
    return (await Promise.all(this.promises)).flatMap((x) => x);
  }
}
