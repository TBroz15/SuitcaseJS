<p align="center">
    <img src="./SuitcaseJSL.png" />
    <h3 align="center">State of the art Minecraft Bedrock Behavior and Resource Pack Compiler.</h3>
</p>

<div align="center">
    <a href="https://www.npmjs.com/package/suitcasejs">
        <img alt="NPM Downloads" src="https://img.shields.io/npm/d18m/suitcasejs?color=dodgerblue&logoColor=white"/>
        <img alt="NPM Version" src="https://img.shields.io/npm/v/suitcasejs?">
    </a>
</div>

## Why?

<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Large packs contain lengthy characters, unnecessary whitespaces, and uncompressed files, scripts, and assets. Downloading these packs would be a pain for the users due to slow internet issues. <b>Suitcase.js</b> fixes this by making it compact as much as possible, reducing the bandwidth need to download a specific pack and gives micro-optimizations <i>vs. the original pack.</i></p>

## How To Install?

### Prerequisites

- NodeJS 18 or above. _Use 22 or above for faster compilation._
- Any Javascript package manager such as NPM, PNPM Yarn, Bun, etc.
- A fully functional computer _of course!_

_You can install it locally as you want to, **but you have to include npx**._

1. Install **SuitcaseJS** using your package manager. For this case in NPM, run `npm install -g suitcasejs`.
2. Reopen the terminal, run `suitcase --version` to check if **Suitcase.js** has been installed. _If reopening the terminal and running the command won't work, try restarting your computer._

## Example Usage

### To Compile a Pack

```cmd
suitcase --compile "default" --in "./packs/" --out "./pack.mcpack"
```

<p align="justify"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As of now, you have to only modify the <code>--in</code> and <code>--out</code> arguments. The <code>--compile</code> argument is mean't to define a supposed config file when compiling packs. These features are to be released in version 0.2.0.</i></p>

## [Wiki](https://github.com/TBroz15/SuitcaseJS/wiki)

For usages, benchmarks, and tips, please check out the [**Suitcase.js** wiki page](https://github.com/TBroz15/SuitcaseJS/wiki)!

## Contributing

As of now, contributing to **Suitcase.js** is quite limited. You can contribute through looking for issues or suggest a feature/enhancement.

_If there is a problem when installing or running_ **_Suitcase.js_**, _please report an issue right away. Thanks!_
