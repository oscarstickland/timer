import { Router } from 'express';
import { loginUser, getUser } from "./auth.controller";
import {authenticate} from "../../middleware/auth.middleware";

const router = Router();

router.post("/login", loginUser);

router.get("/user", authenticate, getUser)

export default router;