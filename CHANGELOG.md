# [3.0.0](https://github.com/TBroz15/SuitcaseJS/compare/v2.1.2...v3.0.0) (2024-10-15)


### Bug Fixes

* **compiler@api:** :adhesive_bandage: remove .finish() ([8d66e88](https://github.com/TBroz15/SuitcaseJS/commit/8d66e8896a1b31aa2523bfd2b7a932ec8c633818))


### Features

* 🎸 changed structure of class ([5887b9b](https://github.com/TBroz15/SuitcaseJS/commit/5887b9be0c125aecb5fa11e5f83f1b3b00af5baa))
* 🎸 remove dashes on commands ([a7d4eda](https://github.com/TBroz15/SuitcaseJS/commit/a7d4edad06452bdc77c30ced4551e572d5eea846))
* **cli:** add "sjs" as alias for cli ([6415b00](https://github.com/TBroz15/SuitcaseJS/commit/6415b00175c8805f5b6f3f98c597c755525e5cd2))
* **cli:** add config flag for command "compile" ([9e6964f](https://github.com/TBroz15/SuitcaseJS/commit/9e6964faab7f48af4d394802e68bf222e0cd0c26))


### BREAKING CHANGES

* 🧨 Renamed the commands
* 🧨 AfterCompilation.finish() removed

## [2.1.2](https://github.com/TBroz15/SuitcaseJS/compare/v2.1.1...v2.1.2) (2024-09-20)


### Bug Fixes

* **hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh:** :clown_face: force release to minor version ([8192aa7](https://github.com/TBroz15/SuitcaseJS/commit/8192aa714fbf3016d37de783d00f729ffade7956))

## [2.1.1](https://github.com/TBroz15/SuitcaseJS/compare/v2.1.0...v2.1.1) (2024-09-20)


### Bug Fixes

* **compiler@api:** :ambulance: add main index ([c09a56d](https://github.com/TBroz15/SuitcaseJS/commit/c09a56dc8c9b4121f46f49219d70aec973629f3b))

# [2.1.0](https://github.com/TBroz15/SuitcaseJS/compare/v2.0.1...v2.1.0) (2024-09-20)


### Bug Fixes

* **compiler@asset:** :adhesive_bandage: exclude compress on PNG ([d388670](https://github.com/TBroz15/SuitcaseJS/commit/d388670bd8950239e4c9c35b98cf5bb5694dcbd1))
* **compiler@other:** :thread: default to 4 threads when there is no available CPU info ([e4b7eb4](https://github.com/TBroz15/SuitcaseJS/commit/e4b7eb4469af0e7688a20ced2597117ebf7a217f))


### Features

* **cli:** :sparkles: add "bare bones" compilation ([514cb62](https://github.com/TBroz15/SuitcaseJS/commit/514cb620d0196457fcec10854936f347a915a41b))
* **cli:** :wrench: add config initializer ([f967f95](https://github.com/TBroz15/SuitcaseJS/commit/f967f950465e91b50e6f2ebb3f53bba3020f27c3))
* **compiler@api:** :sparkles: add api support yippee! ([1121825](https://github.com/TBroz15/SuitcaseJS/commit/1121825a4355992263a4c0bb9d7e09b3ab62479f))
* **compiler@config:** :sparkles: add globbing ([93a8623](https://github.com/TBroz15/SuitcaseJS/commit/93a86230fb2a874ff42556a5b973293ce82fb51e))
* **compiler@config:** :sparkles: add option to log errors in getting config ([5ab19d3](https://github.com/TBroz15/SuitcaseJS/commit/5ab19d3e813d34da7a4530e3d83fd6dcc922c7c6))
* **compiler@other:** :sparkles: add JSON, PNG, LANG, JPG and caching config ([25b5489](https://github.com/TBroz15/SuitcaseJS/commit/25b54896f7a70049262b326202b2ce8a04d02f84))


### Performance Improvements

* **compiler@other:** :zap: full multithreading rewrite! ([35c9277](https://github.com/TBroz15/SuitcaseJS/commit/35c92771c411450a693c35d9b1ca65ab9b0dd452))

## [2.0.1](https://github.com/TBroz15/SuitcaseJS/compare/v2.0.0...v2.0.1) (2024-09-06)


### Performance Improvements

* **compiler@other:** :zap: update fdir-size ([33f440c](https://github.com/TBroz15/SuitcaseJS/commit/33f440ca6dd0ce145cbd764412536b45fb442263))

# [2.0.0](https://github.com/TBroz15/SuitcaseJS/compare/v1.5.0...v2.0.0) (2024-08-30)


### Features

* **compiler@config:** force breaking changes about config ([859647a](https://github.com/TBroz15/SuitcaseJS/commit/859647a4b59eefbec29b7a2a02cc0ea3636dc2c4))


### BREAKING CHANGES

* **compiler@config:** js-yaml is now optional to install and the structure of the config file has
changes.

# [1.5.0](https://github.com/TBroz15/SuitcaseJS/compare/v1.4.10...v1.5.0) (2024-08-29)


### Bug Fixes

* **compiler@config:** :adhesive_bandage: "no valid config" message now warns instead of error ([15b7139](https://github.com/TBroz15/SuitcaseJS/commit/15b71397265b1fe694631cc7738665b79c11c723))
* **deps:** :arrow_up: upgrade fdir to 6.3.0 and fdir-size to 1.0.2 ([9657de3](https://github.com/TBroz15/SuitcaseJS/commit/9657de30cadcf3a37935e998273d771b65a1395d))


### Features

* **compiler@config:** :fire: handle js-yaml as an optional package ([d2ff69e](https://github.com/TBroz15/SuitcaseJS/commit/d2ff69eefd54fb156b698d1dcdb7ff54b9aa67db))
* **compiler@config:** :sparkles: :wrench: config overhaul! ([61e9b1d](https://github.com/TBroz15/SuitcaseJS/commit/61e9b1d978e1f2a5e3adbfb73a2d58e39c1ee046))
* **compiler@json:** :sparkles: :zap: add JSON errorChecking option to config ([d8d043d](https://github.com/TBroz15/SuitcaseJS/commit/d8d043deeaba594068842d4593897df7afadf9be))

## [1.4.10](https://github.com/TBroz15/SuitcaseJS/compare/v1.4.9...v1.4.10) (2024-08-27)


### Bug Fixes

* **deps:** :adhesive_bandage: update micromatch to fix vulnerability ([05346cc](https://github.com/TBroz15/SuitcaseJS/commit/05346ccba5ae3b753233b6b93fbfe609bef20b07))

## [1.4.9](https://github.com/TBroz15/SuitcaseJS/compare/v1.4.8...v1.4.9) (2024-08-27)


### Bug Fixes

* **compiler@other:** :adhesive_bandage: create temp dir before compilation ([c91960f](https://github.com/TBroz15/SuitcaseJS/commit/c91960fb58e4a1bea17dba87ab712b81bff7124d))

## [1.4.8](https://github.com/TBroz15/SuitcaseJS/compare/v1.4.7...v1.4.8) (2024-08-21)


### Bug Fixes

* **publish:** :construction_worker: ignore unnecessary files ([50b38a5](https://github.com/TBroz15/SuitcaseJS/commit/50b38a5dcc7c36da8f60e7275e1664caf436caf0))

## [1.4.7](https://github.com/TBroz15/SuitcaseJS/compare/v1.4.6...v1.4.7) (2024-08-21)


### Performance Improvements

* **compiler@other:** :zap: faster dir size calculation ([0581f64](https://github.com/TBroz15/SuitcaseJS/commit/0581f646efcad116be26080752787f7383c4ffca))

## [1.4.6](https://github.com/TBroz15/SuitcaseJS/compare/v1.4.5...v1.4.6) (2024-08-18)


### Performance Improvements

* **cli:** :zap: :package: substitute mri for yargs ([79e1905](https://github.com/TBroz15/SuitcaseJS/commit/79e1905bc135143add7133109d1c0c94b38dc0e0))

## [1.4.5](https://github.com/TBroz15/SuitcaseJS/compare/v1.4.4...v1.4.5) (2024-08-18)


### Bug Fixes

* **compiler@other:** :adhesive_bandage: fix a potential error when writing cache with the same hash ([cdd2e52](https://github.com/TBroz15/SuitcaseJS/commit/cdd2e529c37ce0588ae5fc66297e53d9fff83c9f))

## [1.4.4](https://github.com/TBroz15/SuitcaseJS/compare/v1.4.3...v1.4.4) (2024-08-14)


### Bug Fixes

* **compiler@other:** :adhesive_bandage: remove unnecessary array creation ([ba83f90](https://github.com/TBroz15/SuitcaseJS/commit/ba83f90accc743d5a4fd3228fb37e40234c382fd))

## [1.4.3](https://github.com/TBroz15/SuitcaseJS/compare/v1.4.2...v1.4.3) (2024-08-14)


### Performance Improvements

* **compiler@other:** :zap: optimize array chunking ([d3bfab7](https://github.com/TBroz15/SuitcaseJS/commit/d3bfab79d8bfbc85c47d69baf7b6a2ef8756cb48))

## [1.4.2](https://github.com/TBroz15/SuitcaseJS/compare/v1.4.1...v1.4.2) (2024-08-12)


### Performance Improvements

* **compiler <other>:** :zap: copying files is done through promises ([8cb257a](https://github.com/TBroz15/SuitcaseJS/commit/8cb257a8387429b03f5c5407039d4514fd9582d9))
* **compiler <other>:** :zap: ignore potential empty array to be sent to threads ([c7d7e64](https://github.com/TBroz15/SuitcaseJS/commit/c7d7e64f63a2059e14280e4820fd7ab2df7b8228))

## [1.4.1](https://github.com/TBroz15/SuitcaseJS/compare/v1.4.0...v1.4.1) (2024-08-08)


### Bug Fixes

* :adhesive_bandage: fs rm wont freeze spinner ([93f0ecf](https://github.com/TBroz15/SuitcaseJS/commit/93f0ecf599e72d7da70106ac677aa1160cf2cdd9))
* **compiler: compression:** :adhesive_bandage: create non-existent dir to prevent potential bug ([19f8710](https://github.com/TBroz15/SuitcaseJS/commit/19f8710b3dfd4d260684de9736f15f207ec04a3b))

# [1.4.0](https://github.com/TBroz15/SuitcaseJS/compare/v1.3.1...v1.4.0) (2024-08-08)


### Features

* **asset:** :sparkles: add png compression ([7731eed](https://github.com/TBroz15/SuitcaseJS/commit/7731eed22879c3af125ec2f712a9c178de223bf6))


### Performance Improvements

* **compression:** :zap: replace archiver with adm-zip for faster compress ([df0b2bd](https://github.com/TBroz15/SuitcaseJS/commit/df0b2bd03d6939169937f3f6c68ea7f5857d88f8))

## [1.3.1](https://github.com/TBroz15/SuitcaseJS/compare/v1.3.0...v1.3.1) (2024-08-06)


### Bug Fixes

* :bug: input only the files' origin path instead of the temp path on error ([00cab33](https://github.com/TBroz15/SuitcaseJS/commit/00cab33f609092aa43b26212b4a1f03ffdc7146d))

# [1.3.0](https://github.com/TBroz15/SuitcaseJS/compare/v1.2.4...v1.3.0) (2024-08-06)


### Features

* :sparkles: add a proper error list for JSON minifier ([af5dc68](https://github.com/TBroz15/SuitcaseJS/commit/af5dc68d654249caa43e8671a30d11fcf46c0296))

## [1.2.4](https://github.com/TBroz15/SuitcaseJS/compare/v1.2.3...v1.2.4) (2024-08-06)


### Performance Improvements

* :zap: file gathering now happens on the main compiler instead of workers ([234e063](https://github.com/TBroz15/SuitcaseJS/commit/234e06329d174e135a4d4e066110d4919c041f1d))

## [1.2.3](https://github.com/TBroz15/SuitcaseJS/compare/v1.2.2...v1.2.3) (2024-08-05)


### Bug Fixes

* add error checking on comparison ([751330f](https://github.com/TBroz15/SuitcaseJS/commit/751330f3f2fb6379f479682e1c5d540a64900ec8))

## [1.2.1](https://github.com/TBroz15/SuitcaseJS/compare/v1.1.2...v1.2.1) (2024-07-05)


*This changelog was manually made. I haven't setup changelog system for semantic release... -TBroz15* 

### New Features

* feat: 🔧 support for suitcase config files ([b0bbb33](https://github.com/TBroz15/SuitcaseJS/commit/b0bbb33eba95b4ef7fa198b0ec800491e5af03e9))

### Bug Fixes

* build: 💚 fix where includeDir is not defined, caused to incomplete files

### First Contribution!

Big thanks to @Goofy9506 for the first ever contribution!

## [1.2.2](https://github.com/TBroz15/SuitcaseJS/compare/v1.2.1...v1.2.2) (2024-08-05)


### Bug Fixes

* set fast=folder-size as a trusted dependency for bun ([612fca4](https://github.com/TBroz15/SuitcaseJS/commit/612fca48201442cc7932405a20d80c3968e6ca2a))
