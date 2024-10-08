# Contributing

Thank you for contributing to SuitcaseJS! These are the guidelines if you are willing to contribute.

## Before Sending Issues

1. _Remember, a search bar exists..._ So you must look for open issues with the same problem and have some discussion instead of creating another one. Its fine to create a new issue that is similar to a closed issue.
2. For bug reports, make sure reproduction is as accurate as possible.
3. The intention of **Suitcase.js** is to make packs and files _really_ compact for production and improve Minecraft pack users' and developers' experience. So it must be on topic with this project!

## Development (PR)

### Prerequisites

- Git
- Visual Studio Code
- NodeJS 18 or above
- PNPM (install through `pnpm i -g pnpm`)

### Steps

1. Fork this repository
2. In your repository, create a new branch of any name.
3. Clone your fork to your computer.
4. Run `pnpm i` to install packages.
5. Create some changes for your PR.
6. Use `pnpm run test -- ` to test out the cli. For example: `pnpm run test -- -c -i ./in/ -o ./out.mcpack`
7. Run the script `pnpm run lint` to check your code.
8. Use the provided `pnpm run commit` or [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) to create a proper commit message.
9. Push your branch to GitHub through `git push origin (your branch name)`
10. Finally send your pull request to main. _It is recommended to draft your PR first if you are not sure with your code._

> [!IMPORTANT]
>
> **For breaking changes run `pnpm run commit`!**
>
> Conventional Commits won't let `semantic-release` declare as a breaking change release on commit.
