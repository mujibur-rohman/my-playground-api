import { NextFunction, Request, Response } from "express";
import authService from "../service/auth.service";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.register(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({
      data: result,
      message: "Login Success",
    });
  } catch (e) {
    next(e);
  }
};

export default { register, login };
