import { Router } from "express";
import reactorRoutes from "./reactorRoutes.js";

const router = Router();

router.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Estabiliza el Reactor: POST /adjust, POST /reboot
router.use("/", reactorRoutes);

export default router;
