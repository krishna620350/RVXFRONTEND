import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "RVX Social App",
        short_name: "RVX",
        start_url: ".",
        display: "standalone",
        background_color: "#1f2937",
        theme_color: "#2563eb",
        description: "A modern social platform with chat, posts, and more.",
        icons: [
          {
            src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
});
