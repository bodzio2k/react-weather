import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["**/*.stories.*", "**/node_modules/**", "**/dist/**"],
  },
});
