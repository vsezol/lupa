// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }

          return `[name]-[hash][extname]`;
        },
        chunkFileNames: "[name]-[hash].js",
        entryFileNames: "[name]-[hash].js",
      },
    },
  },
});
