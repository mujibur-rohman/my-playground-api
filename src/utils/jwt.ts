import jwt from "jsonwebtoken";

export const signJWT = (
  payload: Object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    ...options,
  });
};
