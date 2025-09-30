// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";
import betterTailwind from "eslint-plugin-better-tailwindcss";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

// Pull in Next’s configs
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Your Tailwind readability rules
  {
    plugins: {
      "better-tailwindcss": betterTailwind,
    },
    rules: {
      // Split long class lists into multiple lines (the backticked multiline style)
      "better-tailwindcss/multiline": ["warn", { printWidth: 100 }],

      // Optional: Tailwind-aware sorting (you can keep Biome’s sorting too)
      "better-tailwindcss/sort-classes": "warn",
    },
    settings: {
      // Tailwind v4: point to the CSS entry that includes Tailwind (adjust path!)
      // For App Router:
      // "better-tailwindcss": { entryPoint: "app/globals.css" }
      // For Pages Router:
      // "better-tailwindcss": { entryPoint: "src/styles/globals.css" }
      "better-tailwindcss": { entryPoint: "app/globals.css" },
    },
  },
];

export default eslintConfig;
