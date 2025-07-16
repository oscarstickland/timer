import express from 'express';
import 'dotenv/config';

import authRouter from "./features/auth/auth.router";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", authRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});