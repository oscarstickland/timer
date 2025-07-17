import express, {Router} from "express";
import {credentialsSchema, loginUser, LoginUserStatus} from './auth.controller';

const router = Router();
router.use(express.urlencoded({ extended: true }));

router.get("/", (req: express.Request, res: express.Response) => {
    return res.render('index');
});

router.get("/auth/login", (req: express.Request, res: express.Response) => {
    return res.render('login');
});

router.post("/auth/login", async (req: express.Request, res: express.Response) => {
    try {
        const parsed = credentialsSchema.parse(req.body);
        const response = await loginUser(parsed);

        switch (response.status) {
            case LoginUserStatus.OK:
                // store the token
                res.cookie("token", response.token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                });
                return res.redirect("/app");
            case LoginUserStatus.INCORRECT_DETAILS:
                return res.status(401).send();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
});

export default router;
