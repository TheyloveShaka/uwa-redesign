import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves this as a project page at /uwa-redesign/, not at the
  // domain root, so every built asset URL needs that prefix. Dev stays at
  // "/" — only `vite build` needs the subpath.
  base: command === "build" ? "/uwa-redesign/" : "/",
  // Honour an externally assigned port. Vite does not read PORT on its own, and
  // hardcoding one collides with whatever else is already running on this
  // machine; falling back to Vite's default keeps `pnpm dev` behaving normally.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
  preview: {
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
}));
