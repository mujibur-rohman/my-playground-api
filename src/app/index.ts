import express, { Application } from "express";

export const app: Application = express();
export const PORT: number = 5000;

app.use(express.json());
