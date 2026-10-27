import { HttpError } from "../utils/HttpError.js";
import { esEnteroPositivo } from "../utils/helpers.js";
import * as cargaService from "../services/cargaService.js";
import { listarInventario } from "../services/inventarioService.js";

// Las mutaciones devuelven carga + inventario ya actualizados:
// el frontend sincroniza todo con UNA sola respuesta.
const estadoActual = (mensaje) => ({
  mensaje,
  carga: cargaService.obtenerCarga(),
  inventario: listarInventario(),
});

const leerIdParam = (req) => {
  const id = Number(req.params.id);
  if (!esEnteroPositivo(id)) throw new HttpError(400, "El id del suministro no es válido");
  return id;
};

export const verCarga = (req, res) => res.json(cargaService.obtenerCarga());

export const agregar = (req, res) => {
  const { equipoId, cantidad } = req.body ?? {};
  if (!esEnteroPositivo(equipoId) || !esEnteroPositivo(cantidad)) {
    throw new HttpError(400, "Debes enviar equipoId y cantidad como enteros mayores a 0");
  }

  cargaService.agregarItem(equipoId, cantidad);
  res.status(201).json(estadoActual("Suministro añadido a la nave"));
};

export const actualizarUnidades = (req, res) => {
  const id = leerIdParam(req);
  const { cantidad } = req.body ?? {};
  if (!esEnteroPositivo(cantidad)) {
    throw new HttpError(400, "La cantidad debe ser un entero mayor a 0 (para quitarlo usa DELETE)");
  }

  cargaService.actualizarUnidades(id, cantidad);
  res.json(estadoActual("Unidades actualizadas"));
};

export const eliminar = (req, res) => {
  const id = leerIdParam(req);
  cargaService.eliminarItem(id);
  res.json(estadoActual("Suministro desembarcado"));
};
