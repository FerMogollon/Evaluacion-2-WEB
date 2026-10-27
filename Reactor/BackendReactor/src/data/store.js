// Estado en memoria. Se exporta como const y se MUTA en sitio.
import { TEMP_MIN, TEMP_MAX } from "../config.js";

export const generarTemperatura = () =>
  Math.floor(Math.random() * (TEMP_MAX - TEMP_MIN + 1)) + TEMP_MIN;

export const reactor = { temperatura: generarTemperatura() }; // se genera al iniciar el servidor
