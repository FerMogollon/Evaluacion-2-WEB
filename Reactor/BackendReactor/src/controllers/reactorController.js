import { HttpError } from "../utils/HttpError.js";
import { TEMP_MIN, TEMP_MAX } from "../config.js";
import { evaluarIntento, reiniciarReactor } from "../services/reactorService.js";

export const ajustar = (req, res) => {
  const { temperatura } = req.body ?? {};

  if (!Number.isInteger(temperatura) || temperatura < TEMP_MIN || temperatura > TEMP_MAX) {
    throw new HttpError(400, `La temperatura debe ser un número entero entre ${TEMP_MIN} y ${TEMP_MAX}`);
  }

  res.json(evaluarIntento(temperatura));
};

export const reiniciar = (req, res) => {
  reiniciarReactor();
  res.json({ mensaje: "Sistema reiniciado. Nueva temperatura de estabilización generada." });
};
