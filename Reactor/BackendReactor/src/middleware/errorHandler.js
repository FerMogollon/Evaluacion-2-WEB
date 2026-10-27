import { HttpError } from "../utils/HttpError.js";

export const notFound = (req, res) =>
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });

// Todas las respuestas de error tienen la forma { mensaje, ...extras }.
// En React: error.mensaje
export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ mensaje: err.message, ...err.extra });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ mensaje: "JSON inválido en el cuerpo de la petición" });
  }
  console.error(err);
  res.status(500).json({ mensaje: "Error interno del servidor" });
};
