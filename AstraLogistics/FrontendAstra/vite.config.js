import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// El backend tiene CORS_ORIGIN = http://localhost:5173, así que fijamos ese puerto.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
});
