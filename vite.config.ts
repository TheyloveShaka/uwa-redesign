import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Honour an externally assigned port. Vite does not read PORT on its own, and
  // hardcoding one collides with whatever else is already running on this
  // machine; falling back to Vite's default keeps `pnpm dev` behaving normally.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
  preview: {
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
});
