import eslint from "@eslint/js";
import pluginImportOrder from "eslint-plugin-import";
import pluginArrowFunctions from "eslint-plugin-prefer-arrow-functions";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginReactRecommended from "eslint-plugin-react/configs/recommended.js";
import pluginReactHook from "eslint-plugin-react-hooks";

import globals from "globals";

import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

const config = [
  {
    ignores: [
      "dist/**/*",
      "node_modules/**/*",
      ".yarn/**/*",
      ".pnp.*",
      "*.config.*js",
    ],
  },
  { languageOptions: { globals: globals.browser } },
  ...compat.extends("standard-with-typescript"),
  eslint.configs.recommended,
  pluginReactRecommended,
  pluginPrettierRecommended,
  {
    plugins: {
      "plugin-arrow-functions": pluginArrowFunctions,
      "plugin-import-order": pluginImportOrder,
      "react-hooks": pluginReactHook,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      // De-activated rules
      "no-console": "off",
      "no-extra-boolean-cast": "off",
      "no-useless-constructor": "off",
      "unicorn/prefer-includes": "off",

      // Added rules
      "prefer-template": "error",
      "prefer-arrow-callback": "error",
      "plugin-arrow-functions/prefer-arrow-functions": "error",
      "sort-imports": "warn",
      "plugin-import-order/order": [
        "error",
        {
          groups: [
            "builtin",
            "internal",
            "external",
            "parent",
            "sibling",
            "index",
            "object",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
          },
        },
      ],
    },
  },
];

export default config;
