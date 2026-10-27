import { reiniciarMision } from "../services/misionService.js";
import { obtenerCarga } from "../services/cargaService.js";
import { listarInventario } from "../services/inventarioService.js";

export const reiniciar = (req, res) => {
  reiniciarMision();
  res.json({
    mensaje: "Misión reiniciada. ¡Buena suerte, capitán!",
    carga: obtenerCarga(),
    inventario: listarInventario(),
  });
};
