import { Router } from "express";
import authController from "../controller/auth.controller";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", authController.register);

export default AuthRouter;
