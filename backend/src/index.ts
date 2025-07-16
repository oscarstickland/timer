import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});