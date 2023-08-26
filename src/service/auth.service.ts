import { db } from "../app/database";
import { ResponseError } from "../error/response-error";
import { signJWT } from "../utils/jwt";
import { logger } from "../utils/logger";
import { validate } from "../validation";
import {
  loginValidation,
  refreshValidation,
  registerValidation,
} from "../validation/auth.validation";
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

const login = async (request: any) => {
  const userValid = validate(loginValidation, request);

  const user = await db.user.findUnique({
    where: {
      username: userValid.username,
    },
    select: {
      username: true,
      password: true,
      name: true,
      profile: true,
      role: true,
    },
  });

  if (!user) {
    throw new ResponseError(403, "username not registered");
  }

  const isPasswordValid = await bcrypt.compare(
    userValid.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(403, "password wrong");
  }

  const accessToken = signJWT(
    {
      username: user.username,
      role: user.role,
    },
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = signJWT(
    {
      username: user.username,
      role: user.role,
    },
    {
      expiresIn: "1d",
    }
  );

  await db.user.update({
    data: {
      token: refreshToken,
    },
    where: {
      username: user.username,
    },
    select: {
      username: true,
    },
  });

  return {
    name: user.name,
    username: user.username,
    role: user.role,
    token: {
      accessToken,
      refreshToken,
    },
  };
};

const refreshToken = async (request: any) => {
  const token = validate(refreshValidation, request);
  const refreshToken = await db.user.findFirst({
    where: {
      token: token.token,
    },
    select: {
      token: true,
      username: true,
      role: true,
    },
  });

  if (!refreshToken) throw new ResponseError(404, "token invalid");

  const newAccessToken = signJWT(
    {
      username: refreshToken.username,
      role: refreshToken.role,
    },
    {
      expiresIn: "1h",
    }
  );
  const newRefreshToken = signJWT(
    {
      username: refreshToken.username,
      role: refreshToken.role,
    },
    {
      expiresIn: "1d",
    }
  );

  await db.user.update({
    data: {
      token: newRefreshToken,
    },
    where: {
      username: refreshToken.username,
    },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export default {
  register,
  login,
  refreshToken,
};
