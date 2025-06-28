const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const drizzlePlugin = require("eslint-plugin-drizzle");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*", "/.expo", "node_modules", "coverage"],
    languageOptions: {
      globals: {
        expect: "readonly",
        global: "readonly",
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
      },
    },
    plugins: {
      drizzle: drizzlePlugin,
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...drizzlePlugin.configs.recommended.rules,
    },
  },
]);
