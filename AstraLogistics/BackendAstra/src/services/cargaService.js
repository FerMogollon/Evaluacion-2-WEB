import { carga, mision } from "../data/store.js";
import { PRESUPUESTO_INICIAL } from "../config.js";
import { HttpError } from "../utils/HttpError.js";
import { redondear } from "../utils/helpers.js";
import { buscarEquipo } from "./inventarioService.js";
import { tiempoRestanteMs } from "./misionService.js";

const buscarItem = (id) => carga.find((item) => item.id === id);

const calcularTotal = () =>
  redondear(
    carga.reduce((acc, item) => acc + item.cantidad * buscarEquipo(item.id).precio, 0)
  );

const validarPresupuesto = (costoExtra) => {
  if (redondear(calcularTotal() + costoExtra) > PRESUPUESTO_INICIAL) {
    throw new HttpError(400, "Créditos insuficientes para esta cantidad");
  }
};

const validarStock = (equipo, unidadesNecesarias) => {
  if (equipo.stock < unidadesNecesarias) {
    throw new HttpError(400, "Stock en base insuficiente");
  }
};

export const obtenerCarga = () => {
  const total = calcularTotal();
  return {
    creditos: PRESUPUESTO_INICIAL, // presupuesto de la misión
    creditosDisponibles: redondear(PRESUPUESTO_INICIAL - total), // lo que queda
    itemsCargados: carga.map((item) => ({ ...item })), // [{ id, cantidad }]
    total,
    expiraEn: mision.expiraEn, // timestamp (ms) para el contador del frontend
    tiempoRestanteMs: tiempoRestanteMs(),
  };
};

export const agregarItem = (equipoId, cantidad) => {
  const equipo = buscarEquipo(equipoId);
  if (!equipo) throw new HttpError(404, "El suministro no existe en el inventario");

  validarStock(equipo, cantidad);
  validarPresupuesto(equipo.precio * cantidad);

  equipo.stock -= cantidad; // la unidad queda bloqueada para la nave
  const existente = buscarItem(equipoId);
  if (existente) existente.cantidad += cantidad;
  else carga.push({ id: equipoId, cantidad });
};

// `nuevaCantidad` es la cantidad FINAL deseada, no un incremento.
export const actualizarUnidades = (id, nuevaCantidad) => {
  const item = buscarItem(id);
  if (!item) throw new HttpError(404, "Ese suministro no está en la carga de la nave");
  const equipo = buscarEquipo(id);

  const diferencia = nuevaCantidad - item.cantidad; // >0 sube, <0 baja
  if (diferencia > 0) {
    validarStock(equipo, diferencia);
    validarPresupuesto(equipo.precio * diferencia);
  }

  equipo.stock -= diferencia; // si baja, la resta es negativa y el stock sube
  item.cantidad = nuevaCantidad;
};

export const eliminarItem = (id) => {
  const indice = carga.findIndex((item) => item.id === id);
  if (indice === -1) throw new HttpError(404, "Ese suministro no está en la carga de la nave");

  const [eliminado] = carga.splice(indice, 1);
  buscarEquipo(eliminado.id).stock += eliminado.cantidad; // devuelve unidades a la base
};
