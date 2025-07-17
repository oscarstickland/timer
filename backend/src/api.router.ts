import express, {Router} from "express";
import { authenticate } from "./middleware/auth.middleware";

import authRouter from "./features/auth/auth.router";
import timerRouter from "./features/timer/timer.router";
import sessionsRouter from "./features/sessions/sessions.router";
import cookieParser from "cookie-parser";
import cors from "cors";

const router = Router();

router.use(cookieParser());
router.use(express.json());

router.use("/auth", authRouter);
router.use("/timer", authenticate, timerRouter);
router.use("/sessions", authenticate, sessionsRouter);

export default router;