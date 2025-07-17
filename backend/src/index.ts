import express from 'express';
import morgan from "morgan";
import path from "node:path";
import 'dotenv/config';

import apiRouter from "./api.router";
import frontendRouter from "./frontend/frontend.router"
import angularRouter from "./frontend/angular.router";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'frontend/views'));

app.use("/api", apiRouter);
app.use('/app', angularRouter);
app.use("/", frontendRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});