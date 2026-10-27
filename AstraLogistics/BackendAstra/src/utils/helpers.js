// Evita errores de punto flotante con dinero (0.1 + 0.2 !== 0.3).
export const redondear = (n) => Math.round(n * 100) / 100;

export const esEnteroPositivo = (v) => Number.isInteger(v) && v > 0;
