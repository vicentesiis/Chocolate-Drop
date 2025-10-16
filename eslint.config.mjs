import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintParserTypeScript from "@typescript-eslint/parser";
import perfectionist from "eslint-plugin-perfectionist";
import betterTailwind from "eslint-plugin-better-tailwindcss";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslintJs.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  // fatima.eslint.plugin, // import { linter as fatima } from "fatima";
  { ignores: ["node_modules", ".next"] },
  {
    files: ["**/*.{ts,tsx}"],
    ...eslintReact.configs["recommended-typescript"],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: true,
      },
    },
  },
  perfectionist.configs["recommended-natural"],
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "better-tailwindcss": betterTailwind,
    },
    rules: {
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
      "@eslint-react/no-array-index-key": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
      "no-useless-escape": "off",
      "better-tailwindcss/multiline": ["warn", { printWidth: 80 }],
      "better-tailwindcss/sort-classes": "warn",
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "app/globals.css",
      },
    },
  },
  // fatima.eslint.noEnvRule("**/*.tsx"),
);
