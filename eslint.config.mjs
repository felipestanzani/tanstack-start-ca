import { getPresets } from "eslint-config-molindo";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...(await getPresets(
    // Base config
    "typescript", // or 'javascript'

    // Optional extensions
    "react",
    "cssModules",
    "tailwind",
    "jest",
    "cypress",
    "vitest",
  )),
];
