import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    base: "/netflix-clone-v1",
    plugins: [react()],
    resolve: {
      alias: {
        "@src": "/src",
        "@components": "/src/components",
        "@hooks": "/src/hooks",
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: "index.html",
          fallback: "404.html", // Ensure the fallback is included in the build
        },
      },
    },
  };
});

// export default defineConfig(({ mode }) => {
//   return {
//     base: mode === "production" ? "/netflix-clone-v1/" : "/",
//     plugins: [react()],
//     resolve: {
//       alias: {
//         "@src": "/src",
//         "@components": "/src/components",
//         "@hooks": "/src/hooks",
//       },
//     },
//   };
// });
