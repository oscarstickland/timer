import { Router } from 'express';
import { getUser } from "./auth.controller";
import {authenticate} from "../../middleware/auth.middleware";

const router = Router();

router.get("/user", authenticate, getUser);

export default router;