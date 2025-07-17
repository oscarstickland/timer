import { Router } from "express";
import * as timerController from "./timer.controller";

import sessionsRouter from "../sessions/sessions.router";

const router = Router();

router.post('/create', timerController.createTimer);
router.get("/", timerController.listTimers);
router.get("/:timerId", timerController.getSingleTimer);


export default router;