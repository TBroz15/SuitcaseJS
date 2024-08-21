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
