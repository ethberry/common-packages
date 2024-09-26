import typescriptRules from "@ethberry/eslint-config/presets/tsx.mjs";

export default [
  {
    ignores: [
      "**/dist",
      "**/coverage",
    ],
  },

  {
    languageOptions: {
      parserOptions: {
        project: [
          "./tsconfig.eslint.json",
          "./chart/*/tsconfig.eslint.json",
          "./other/*/tsconfig.eslint.json",
          "./provider/*/tsconfig.eslint.json",
          "./react/*/tsconfig.eslint.json",
          "./types/*/tsconfig.eslint.json"
        ],
        tsconfigRootDir: import.meta.dirname
      },
    }
  },

  ...typescriptRules,
];
