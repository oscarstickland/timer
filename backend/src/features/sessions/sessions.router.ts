import express, {Router} from "express";
import * as sessionsController from './sessions.controller';

const router = Router({ mergeParams: true });

router.get("/:timerId/start", sessionsController.startSession);
router.get("/:timerId/stop", sessionsController.stopSession);

router.get('/', sessionsController.getActiveSession);

export default router;