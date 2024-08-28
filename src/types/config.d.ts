export interface IgnoreConf {
  directories: string[];
  extensions: string[];
  files: string[];
}

export interface JSONConf {
  errorChecking: boolean;
}

export interface CompilerConf {
  JSON?: JSONConf;
}

export interface SuitcaseConfig {
  ignore: IgnoreConf;
  compiler: CompilerConf;
}
