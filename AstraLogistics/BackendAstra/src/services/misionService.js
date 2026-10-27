import { mision, restaurarDatosAstro } from "../data/store.js";
import { DURACION_MISION_MS } from "../config.js";

const iniciarMision = () => {
  mision.iniciadaEn = Date.now();
  mision.expiraEn = mision.iniciadaEn + DURACION_MISION_MS;
};

// El reloj arranca con la primera petición a /api/carga (no al encender el servidor).
export const asegurarMisionActiva = () => {
  if (mision.expiraEn === null) iniciarMision();
};

export const misionExpirada = () =>
  mision.expiraEn !== null && Date.now() > mision.expiraEn;

export const tiempoRestanteMs = () =>
  mision.expiraEn === null ? DURACION_MISION_MS : Math.max(0, mision.expiraEn - Date.now());

// Devuelve stock al inventario, vacía la carga y arranca un reloj nuevo.
export const reiniciarMision = () => {
  restaurarDatosAstro();
  iniciarMision();
};
