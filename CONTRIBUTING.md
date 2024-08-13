# Contributing

Thank you for contributing to SuitcaseJS! These are the guidelines if you are willing to contribute.

## Before Sending Issues

1. _Remember, a search bar exists..._ So you must look for open issues with the same problem and have some discussion instead of creating another one. Its fine to create a new issue that is similar to a closed issue.
2. For bug reports, make sure reproduction is as accurate as possible.
3. The intention of **Suitcase.js** is to make packs and files _really_ compact for production and improve Minecraft pack users' and developers' experience. So it must be on topic with this project!

## To Make Pull Requests

1. Fork this repository
2. In your repository, create a new branch of any name.
3. Create some changes for your PR.
4. Use `npm run test -- ` to test out the cli. You can add arguments, for example: `npm run test -- -c -i ./in/ -o ./out.mcpack`
5. Run the script `npm run lint` to check your code.
6. Use the provided `npm run commit` or [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) if you use Visual Studio Code to create a proper commit message.
7. Push your branch to GitHub through `git push origin (your branch name)`
8. Finally send your pull request to main. _It is recommended to draft your PR first if you are not sure with your code._
