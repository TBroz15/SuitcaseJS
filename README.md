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

<p align="justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Large packs contain lengthy characters, unnecessary whitespaces, and uncompressed files, scripts, and assets. Downloading these packs would be a pain for the users due to slow internet issues. <b>SuitcaseJS</b> fixes this by making it compact as much as possible, reducing the bandwidth need to download a specific pack and gives micro-optimizations <i>vs. the original pack.</i></p>

## How to Use it?

### All you need is...

- NodeJS v18 or above. _v22 and above recommeded for faster compilation._
- Any Javascript package manager such as NPM, PNPM Yarn, Bun, etc.
- A fully functional computer _of course!_

### Installation

```
npm i -g suitcasejs
```

You can exclude argument `-g` if you are willing to compile by API or by `npx`.

### Compile through CLI

This is an example on how to compile your pack.

```powershell
sjs compile -i ./packs/ -o ./out.mcpack -c ./.suitcaserc
```

You can use relative file paths or either the full path to define where the directory or file will be.

Argument `-i` defines the directory path of the pack is supposed to be.

Argument `-o` is where the output of the compiled pack will appear.

Argument `-c` defines the config path, although it is optional. The CLI will automatically read the config file with the name `.suitcaserc`, generated by running `sjs init`. If there are no config file, then it will use a default one.

### Or... through API

```typescript
import { Suitcase } from "suitcasejs";

const pack = await new Suitcase("./packs/")
  .readConfig() // Will read ".suitcaserc" if available or the default config.
  .compile("./out.mcpack");

console.log(await pack.getStats()); // returns object stats before and after compilation.
```

## Contributing

Check out [CONTRIBUTING.md](https://github.com/TBroz15/SuitcaseJS/blob/main/CONTRIBUTING.md) for more information to contribute in this project.

[A donation is well appreciated to make this project matter!](https://www.buymeacoffee.com/tbroz15)
