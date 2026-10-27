import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Puerto 5173: coincide con CORS_ORIGIN del backend (config.js)
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
