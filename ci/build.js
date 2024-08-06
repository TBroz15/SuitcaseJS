import esbuild from "esbuild";
import { basename, extname, join } from "path";
import { fdir } from "fdir";
import { copyFile, mkdir } from "fs/promises";

const src = "./src";
const dist = "dist";

const directories = [];
const TSFiles = [];
const etc = [];

const arr = await new fdir({ includeDirs: true })
  .withRelativePaths()
  .crawl(src)
  .withPromise();

arr.shift();

const regexExt = /\.([^.]+)$/;

arr.forEach((path) => {
  let ext = extname(path);

  const srcPath = join(src, path);
  const distPath = join(dist, path);

  if (ext === "") {
    const realExt = regexExt.exec(basename(path));
    if (realExt === null) return directories.push(distPath);
    ext = realExt[0];
  }

  if (ext === ".ts") {
    const splitPath = path.split(".");

    // if file is a suspected .d.ts, ignore.
    if (splitPath[1] === "d") return;

    return TSFiles.push(srcPath);
  } else {
    return etc.push(path);
  }
});

const directoryPromises = directories.map((path) =>
  mkdir(path, { recursive: true })
);

await Promise.all(directoryPromises);

const etcPromises = etc.map((path) =>
  copyFile(join(src, path), join(dist, path))
);

await Promise.all(etcPromises);

esbuild
  .build({
    entryPoints: TSFiles,

    platform: "node",
    target: "node18",
    outdir: dist,
  })
  .then(() => {
    console.log("Build complete.");
  })
  .catch((reason) => {
    console.error(`Build failed! Reason: ${reason}`);
    process.exit(1);
  });
