// Configuración central: un solo lugar para los "números mágicos".
export const PORT = process.env.PORT || 3000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173"; // Vite

// AstroLogistics
export const PRESUPUESTO_INICIAL = 500; // Créditos Galácticos
export const DURACION_MISION_MS =
  Number(process.env.DURACION_MISION_MS) || 10 * 60 * 1000; // 10 min
