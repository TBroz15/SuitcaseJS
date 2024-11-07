import eslint from "@eslint/js";
import tselint from "typescript-eslint";

export default tselint.config(eslint.configs.recommended, {
  ignores: [
    "node_modules/**/*",
    "*.mjs",
    "ci/*.js",
    "dist/**/*",
    "src/compiler/utils/JSONC/*.js",
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
