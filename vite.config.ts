import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/netflix-clone-v1/" : "/",
    plugins: [react()],
    resolve: {
      alias: {
        "@src": "/src",
        "@components": "/src/components",
        "@hooks": "/src/hooks",
      },
    },
  };
});
