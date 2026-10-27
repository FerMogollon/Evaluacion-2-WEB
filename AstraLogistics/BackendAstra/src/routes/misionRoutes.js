import { Router } from "express";
import { reiniciar } from "../controllers/misionController.js";

const router = Router();
router.post("/reiniciar", reiniciar); // extra: no es de los 5 obligatorios

export default router;
