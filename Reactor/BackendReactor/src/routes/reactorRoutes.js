import { Router } from "express";
import { ajustar, reiniciar } from "../controllers/reactorController.js";

const router = Router();
router.post("/adjust", ajustar);
router.post("/reboot", reiniciar);

export default router;
