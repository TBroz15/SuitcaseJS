<p align="center">
    <img src="https://raw.githubusercontent.com/TBroz15/SuitcaseJS/main/SuitcaseJS_Logo.png" />
    <h3 align="center">State of the art Minecraft Bedrock Behavior and Resource Pack Compiler.</h3>
</p>

<div align="center">
    <a href="https://www.npmjs.com/package/suitcasejs">
        <img alt="NPM Downloads" src="https://img.shields.io/npm/d18m/suitcasejs?color=dodgerblue&logoColor=white"/>
        <img alt="NPM Version" src="https://img.shields.io/npm/v/suitcasejs?">
    </a>
</div>
<div align="center">
    <a href="https://www.buymeacoffee.com/tbroz15" target="_blank"><img src="https://img.shields.io/badge/-buy_me_a_coffee!-gray?logo=buy-me-a-coffee" alt="Buy Me A Coffee" width=150></a>
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

_For more commands, please run `suitcase --help`._

## [Wiki](https://github.com/TBroz15/SuitcaseJS/wiki)

For usages, benchmarks, and tips, please check out the [**Suitcase.js** wiki page](https://github.com/TBroz15/SuitcaseJS/wiki)!

## Contributing

Check out [CONTRIBUTING.md](https://github.com/TBroz15/SuitcaseJS/blob/main/CONTRIBUTING.md) for more information to contribute in this project.

[A donation is well appreciated to make this project matter!](https://www.buymeacoffee.com/tbroz15)
