type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

export type NumberRange<F extends number, T extends number> =
  | Exclude<Enumerate<T>, Enumerate<F>>
  | T;

export interface JSONOptions {
  minify?: boolean;
  errorChecking?: boolean;
}
export interface LANGOptions {
  minify?: boolean;
}

export interface PNGOptions {
  compressionLevel?: NumberRange<0, 9>;
  quality?: NumberRange<1, 100>;
  compress?: boolean;
}

export interface JPGOptions {
  quality?: NumberRange<1, 100>;
  compress?: boolean;
  progressive?: boolean;
}

export interface IgnoreConf {
  directories?: string[];
  extensions?: string[];
  files?: string[];
  globs?: string[];
}

export interface Options {
  ignore: IgnoreConf;
  compiler: {
    JSON: JSONOptions;
    LANG: LANGOptions;
    PNG: PNGOptions;
    JPG: JPGOptions;
    withCaching: boolean;
  };
}
