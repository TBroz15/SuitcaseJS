import esbuild from "esbuild";
import { resolve } from "path";
import { fdir } from "fdir";

esbuild
  .build({
    entryPoints: await new fdir().withFullPaths().crawl("./src/").withPromise(),

    platform: "node",
    target: "node22",
    outdir: resolve("./dist/"),
  })
  .then(() => {
    console.log("Build complete.");
  })
  .catch((reason) => {
    console.error(`Build failed! Reason: ${reason}`);
  });
