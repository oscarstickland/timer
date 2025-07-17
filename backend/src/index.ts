import express from 'express';
import 'dotenv/config';

import { authenticate } from "./middleware/auth.middleware";

import authRouter from "./features/auth/auth.router";
import timerRouter from "./features/timer/timer.router";
import sessionsRouter from './features/sessions/sessions.router';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/timer", authenticate, timerRouter);
app.use("/sessions", authenticate, sessionsRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});