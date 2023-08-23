import { db } from "../app/database";
import { ResponseError } from "../error/response-error";
import { logger } from "../utils/logger";
import { validate } from "../validation";
import { registerValidation } from "../validation/auth.validation";
import bcrypt from "bcrypt";

const register = async (request: any) => {
  const user = validate(registerValidation, request);

  /* 
    Check if user exist
  */

  const userExist = await db.user.count({
    where: {
      username: user.username,
    },
  });

  if (userExist > 0) {
    throw new ResponseError(400, "user already exist");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return db.user.create({
    data: user,
    select: {
      username: true,
      name: true,
      role: true,
    },
  });
};

export default {
  register,
};
