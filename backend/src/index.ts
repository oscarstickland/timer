import express from 'express';
import { PrismaClient } from '@prisma/client'

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient()

app.use(express.json());

app.get("/", async (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});