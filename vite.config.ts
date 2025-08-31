import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue2 from "@vitejs/plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/reditop/" : "/",
  plugins: [
    vue2(),
    legacy({
      targets: ["chrome >= 91", "firefox >= 88", "safari >= 15", "edge >= 91"],
      modernPolyfills: true,
      renderLegacyChunks: false,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2022",
  },
  esbuild: {
    target: "es2022",
  },
});
