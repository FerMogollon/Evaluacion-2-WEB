import { Router } from "express";
import { verificarMision } from "../middleware/verificarMision.js";
import {
  verCarga,
  agregar,
  actualizarUnidades,
  eliminar,
} from "../controllers/cargaController.js";

const router = Router();
router.use(verificarMision); // todas las rutas de carga validan que la misión siga vigente

router.get("/", verCarga);
router.post("/agregar", agregar);
router.put("/actualizar-unidades/:id", actualizarUnidades);
router.delete("/eliminar/:id", eliminar);

export default router;
