import AdmZip from "adm-zip";
import getDirSize from "fdir-size";

import { cpus } from "os";
import { rm, stat } from "fs/promises";
import { existsSync, statSync } from "fs";
import { ThreadPool } from "./workers/thread_pool.js";
import { getFiles } from "./utils/get_files.js";
import Config, { configLoader } from "./config/get_config.js";

import { mkOut, mkTemp, mkTempPack, tempPack } from "./utils/temp_folder.js";

import type {
  JSONOptions,
  Options,
  JPGOptions,
  LANGOptions,
  PNGOptions,
} from "./config/config.d.ts";

const threads = cpus().length;

interface FinalStats {
  compileTime: number;
  outPath: string;
  inPath: string;

  before?: number;
  after?: number;
}

export class Suitcase {
  protected inPath: string;
  protected outPath!: string;
  protected stats: FinalStats = {
    compileTime: 0,
    outPath: "",
    inPath: "",
  };

  private files: { JSONFiles?: unknown[][]; PNGFiles?: unknown[][] } = {};

  private options: Options = {
    ignore: {},
    compiler: {
      JSON: { minify: true, errorChecking: true },
      LANG: { minify: true },
      PNG: { compress: true, compressionLevel: 9, quality: 100 },
      JPG: { compress: true, compressionLevel: 9, quality: 100 },
      withCaching: true,
    },
  };

  constructor(inPath: string) {
    if (!inPath) throw new Error("inPath is undefined!");
    this.inPath = inPath;
  }

  ignoreDirectories(paths: string[]) {
    this.options.ignore.directories = paths;
    return this;
  }

  ignoreExtensions(paths: string[]) {
    this.options.ignore.extensions = paths;
    return this;
  }

  ignoreFiles(paths: string[]) {
    this.options.ignore.files = paths;
    return this;
  }

  ignoreGlobs(paths: string[]) {
    this.options.ignore.globs = paths;
    return this;
  }

  JSON(options: JSONOptions) {
    this.options.compiler.JSON = { ...this.options.compiler.JSON, ...options };
    return this;
  }

  LANG(options: LANGOptions) {
    this.options.compiler.LANG = { ...this.options.compiler.LANG, ...options };
    return this;
  }

  PNG(options: PNGOptions) {
    this.options.compiler.PNG = { ...this.options.compiler.PNG, ...options };
    return this;
  }

  JPG(options: JPGOptions) {
    this.options.compiler.JPG = { ...this.options.compiler.JPG, ...options };
    return this;
  }

  withCaching(caching: boolean) {
    this.options.compiler.withCaching = caching;
    return this;
  }

  setOptions(options: Options) {
    this.options = { ...this.options, ...options };
    return this;
  }

  readConfig(path?: string, doLogErrors: boolean = false) {
    this.options = {
      ...this.options,

      // If path is defined, file exists, and its a file, let it load.
      // Or else let it automatically find a valid config.
      ...((path && existsSync(path) && statSync(path).isFile()
        ? configLoader(path, doLogErrors)
        : new Config().load(doLogErrors)) as Options),
    };

    return this;
  }

  /** # DO NOT USE! FOR CLI ONLY.*/
  async setup(outPath: string) {
    if (!outPath) throw new Error("outPath is undefined!");
    this.outPath = outPath;

    this.stats.outPath = outPath;
    this.stats.compileTime = performance.now();

    await mkTemp();
    const [files] = await Promise.all([
      getFiles(this.inPath, threads, this.options.ignore),
      mkOut(outPath),
      mkTempPack(),
    ]);

    this.files = files;
    return this;
  }

  /** # DO NOT USE! FOR CLI ONLY.*/
  async compileFiles() {
    await new ThreadPool(
      threads,
      this.inPath,
      this.files as { JSONFiles: unknown[][]; PNGFiles: unknown[][] },
      this.options
    ).finalize();
    return this;
  }

  /** # DO NOT USE! FOR CLI ONLY.*/
  zipFolder() {
    const archive = new AdmZip();
    archive.addLocalFolder(tempPack);
    archive.writeZip(this.outPath);
    archive.addZipComment("Made with love by SuitcaseJS!");
    return this;
  }

  /** # DO NOT USE! FOR CLI ONLY.*/
  finalize() {
    this.stats.compileTime = performance.now() - this.stats.compileTime;
    this.stats.inPath = this.inPath;

    return new AfterCompilation(this.stats);
  }

  async compile(outPath: string) {
    await this.setup(outPath);
    await this.compileFiles();
    this.zipFolder();
    return this.finalize();
  }
}

class AfterCompilation {
  private stat: FinalStats;

  constructor(stat: FinalStats) {
    this.stat = stat;
  }

  private getStats = async () => {
    const beforeBytes = await getDirSize(this.stat.inPath);
    const afterBytes = (await stat(this.stat.outPath)).size;

    this.stat.before = beforeBytes;
    this.stat.after = afterBytes;
    return this.stat;
  };

  async finish() {
    await rm(tempPack, { recursive: true });
    return this.getStats;
  }
}
