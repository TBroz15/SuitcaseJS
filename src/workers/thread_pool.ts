import { Worker } from "node:worker_threads";
import { cache, tempPack } from "../utils/compiler/temp_folder.js";
import { newSpinner } from "../utils/cli/spinner.js";
import { lowFirstChar, upFirstChar } from "../utils/cli/first_char.js";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import { FunctionNames } from "../types/workers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Thread {
  id: number;
  worker: Worker;
  busy: boolean;
}

export const ThreadPool = (threads: number) => {
  const encoder = new TextEncoder();

  const threadPool: Thread[] = [];

  for (let i = 0; i < threads; i++) {
    const worker = new Worker(resolve(__dirname, "worker.js"), {
      workerData: {
        temp: tempPack,
        cache: cache,
      },
    });
    threadPool.push({ id: i, worker, busy: false });
  }

  const requestQueue: {
    fn: string;
    resolve: (value: unknown) => void;
    reject: unknown;
    data?: unknown;
  }[] = [];

  const processQueue = () => {
    const idleThread = threadPool.find((worker) => !worker.busy);
    if (!idleThread || requestQueue.length === 0) return;

    const { fn, resolve, data } = requestQueue.shift()!;
    const worker = idleThread?.worker;
    idleThread.busy = true;

    const jsonString = JSON.stringify({ fn, data });
    const { buffer } = encoder.encode(jsonString);

    worker?.postMessage({ buffer }, [buffer]);

    worker?.once("message", (result) => {
      idleThread.busy = false;
      resolve(result);
      processQueue();
    });
  };

  const runThread = (fn: FunctionNames, data: unknown) =>
    new Promise((resolve, reject) => {
      requestQueue.push({ fn, resolve, reject, data });
      processQueue();
    });

  const run = (taskName: FunctionNames, fn: FunctionNames, data: unknown) =>
    new Promise((resolve) => {
      const runningText = `${upFirstChar(taskName)}...`;
      const afterText = `Finished ${lowFirstChar(taskName)}.`;

      const spinner = newSpinner(runningText);
      void runThread(fn, data).then((data) => {
        resolve(data);
        spinner("success", { text: afterText });
      });
    });

  const runArray = (fn: FunctionNames, array: unknown[], data: object) =>
    Promise.all(array.map((element) => runThread(fn, { ...data, element })));

  const terminate = () => {
    for (let i = 0; i < threads; i++) {
      void threadPool[i].worker.terminate();
    }
  };

  return { terminate, runArray, run };
};
