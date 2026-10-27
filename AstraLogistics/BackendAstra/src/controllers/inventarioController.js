import { listarInventario } from "../services/inventarioService.js";

export const verInventario = (req, res) => res.json(listarInventario());
