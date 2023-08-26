import { Router } from "express";
import authController from "../controller/auth.controller";
import verifyJWT from "../middleware/token.middleware";

export const AuthRouter: Router = Router();

AuthRouter.post("/", authController.login);
AuthRouter.post("/register", verifyJWT, authController.register);
AuthRouter.post("/refreshToken", authController.refreshToken);

export default AuthRouter;
