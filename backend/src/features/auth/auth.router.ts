import { Router } from 'express';
import { getUser } from "./auth.controller";
import {authenticate} from "../../middleware/auth.middleware";

const router = Router();

router.get("/profile", authenticate, getUser);

export default router;