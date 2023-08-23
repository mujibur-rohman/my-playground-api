import express, { Application } from "express";
import router from "../route";
import { errorMiddleware } from "../middleware/error.middleware";

export const app: Application = express();
export const PORT: number = 5000;

app.use(express.json());
router(app);
app.use(errorMiddleware);
