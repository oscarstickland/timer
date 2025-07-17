import {Router} from "express";
import {createProxyMiddleware} from "http-proxy-middleware";

const router = Router();

router.use("/", createProxyMiddleware({
    target: "http://localhost:4200/app/",
    changeOrigin: true,
    ws: true,
}));

export default router;