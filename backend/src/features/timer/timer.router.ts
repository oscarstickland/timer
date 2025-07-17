import { Router } from "express";
import * as timerController from "./timer.controller";

const router = Router();

router.post('/create', timerController.createTimer);
router.get("/", timerController.listTimers);
router.get("/:timerId", timerController.getSingleTimer);

export default router;