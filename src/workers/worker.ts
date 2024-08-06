import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parentPort, workerData } from "node:worker_threads";
import { createHash } from "node:crypto";
import { errorListFile } from "../utils/temp_folder.js";
import { removeComments } from "../utils/remove_comments.js";
import { copyFile } from "node:fs/promises";

const { cache, temp } = workerData as {
  threads: number;
  cache: string;
  temp: string;
};

const functions: Functions = {
  async copyEtc({ inPath, element: etc }) {
    // If array is empty, ignore it right away
    if (!etc[0]) return;

    const promises = etc.map((path) =>
      copyFile(join(inPath, path), join(temp, path))
    );

    await Promise.all(promises);
  },
  async minifyJSON({ inPath, element: JSONFiles }) {
    // If array is empty, ignore it right away
    if (!JSONFiles[0]) return;

    const errorList: unknown[] = [];

    const promises = JSONFiles.map((path) => {
      const filePath = join(temp, path);
      let data = readFileSync(join(inPath, path), "utf-8");
      const hash = createHash("md5").update(data).digest("hex");

      const cacheFile = join(cache, hash.concat(".json"));
      const cacheFileExists = existsSync(cacheFile);

      if (cacheFileExists) return copyFile(cacheFile, filePath);

      try {
        data = removeComments(data);
        // This minifies the JSON, and at the same time check one error.
        // Far better to just lint it through any editor such as VSCode.
        data = JSON.stringify(JSON.parse(data));
      } catch (error) {
        errorList.push({ error, path });
      }

      writeFileSync(filePath, data);
      return copyFile(filePath, cacheFile);
    });

    await Promise.all(promises);

    if (errorList[0]) {
      if (!existsSync(errorListFile)) writeFileSync(errorListFile, "[]");
      const allErrors = JSON.parse(
        readFileSync(errorListFile, "utf-8")
      ) as unknown[];
      allErrors.push(...errorList);
      writeFileSync(errorListFile, JSON.stringify(allErrors));
    }
  },
};

const decoder = new TextDecoder();

const receiveEncodedJSON = (buffer: ArrayBuffer) => {
  const jsonString = decoder.decode(buffer);
  return JSON.parse(jsonString) as object | never[];
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
parentPort!.on("message", async ({ buffer }) => {
  const { fn, data } = receiveEncodedJSON(buffer as ArrayBuffer) as {
    fn: keyof Functions;
    data: never;
  };

  if (typeof functions[fn] === "undefined")
    throw new Error("Function is not defined!");

  parentPort?.postMessage(await functions[fn](data));
});
