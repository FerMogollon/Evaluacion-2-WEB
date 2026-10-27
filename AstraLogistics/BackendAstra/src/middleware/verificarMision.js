import { HttpError } from "../utils/HttpError.js";
import { asegurarMisionActiva, misionExpirada } from "../services/misionService.js";

// 410 Gone: el recurso (la ventana de lanzamiento) ya no está disponible.
export const verificarMision = (req, res, next) => {
  asegurarMisionActiva();
  if (misionExpirada()) {
    return next(
      new HttpError(410, "La ventana de lanzamiento se cerró. Inicia la misión nuevamente.", {
        expirada: true,
      })
    );
  }
  next();
};
