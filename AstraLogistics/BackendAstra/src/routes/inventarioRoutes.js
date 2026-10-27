import { Router } from "express";
import { verInventario } from "../controllers/inventarioController.js";

const router = Router();
router.get("/", verInventario);

export default router;
