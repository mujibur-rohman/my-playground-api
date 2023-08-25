import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";
import jwt from "jsonwebtoken";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) throw new ResponseError(403, "invalid token");
  const token = accessToken.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
    if (error) throw new ResponseError(403, "invalid token");
    res.locals.user = decoded;
    next();
  });
};

export default verifyJWT;
