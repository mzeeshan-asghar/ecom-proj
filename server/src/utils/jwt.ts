import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getEnv,
  addCookies,
  calculateExpiresIn,
  calculateExpiryTime,
  createAuthSession,
} from "@/utils/helper";
import { Request, Response } from "express";
import RefreshTokenModel from "@/models/refreshToken";
import envConfig from "@/config/envConfig";
import mongoose from "mongoose";
import logger from "@/utils/logger";

export interface IJwtTokens {
  refreshToken: string;
  accessToken: string;
  refreshExp: number;
  accessExp: number;
}

export interface ITokenPayload {
  _id: string | mongoose.Types.ObjectId;
  role: string;
}

export const generateTokens = async ({
  _id,
  role,
}: ITokenPayload): Promise<IJwtTokens> => {
  if (!_id || !role) {
    throw new Error("Missing required parameters");
  }

  const payload: JwtPayload = { _id: _id.toString(), role };

  const accessDuration = "15m";
  const refreshDuration = "7d";

  const accessExp = calculateExpiryTime(accessDuration, true);
  const refreshExp = calculateExpiryTime(refreshDuration, true);

  const accessToken = jwt.sign({ ...payload }, envConfig.jwt.accessSecret, {
    expiresIn: calculateExpiresIn(accessDuration),
  });

  const refreshToken = jwt.sign({ ...payload }, envConfig.jwt.refreshSecret, {
    expiresIn: calculateExpiresIn(refreshDuration),
  });

  logger.info("Generated new tokens", { userId: _id });

  await RefreshTokenModel.updateOne(
    { userId: _id },
    { token: refreshToken, blacklisted: false },
    { upsert: true }
  );

  return { accessToken, refreshToken, accessExp, refreshExp };
};

export const verifyJwtToken = (
  token: string,
  secretType: "JWT_ACCESS_SECRET" | "JWT_REFRESH_SECRET"
): JwtPayload | null => {
  try {
    return jwt.verify(token, getEnv(secretType)) as JwtPayload;
  } catch (error) {
    logger.error("Error verifying token", { error });
    return null;
  }
};

export const attachDecodedUser = (req: Request, decoded: JwtPayload): void => {
  if (decoded) {
    req.user = { ...decoded, isAuth: true };
    logger.info("User attached to request", { user: req.user });
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response
): Promise<IJwtTokens> => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new Error("Refresh token is missing.");
  }

  const tokenRecord = await RefreshTokenModel.findOne({
    token: refreshToken,
    blacklisted: false,
  });

  if (!tokenRecord) {
    logger.warn("Invalid or blacklisted refresh token.");
    throw new Error("Invalid or expired refresh token.");
  }

  const decoded = verifyJwtToken(refreshToken, "JWT_REFRESH_SECRET");

  if (!decoded) {
    await RefreshTokenModel.updateOne(
      { token: refreshToken },
      { blacklisted: true }
    );
    logger.warn("Refresh token is invalid, blacklisted, or expired.");
    throw new Error("Invalid refresh token.");
  }

  logger.info("Refresh token successfully verified", { userId: decoded._id });
  return createAuthSession(res, decoded as ITokenPayload);
};

export const handleTokenRefresh = async (req: Request, res: Response) => {
  const tokenData = await refreshAccessToken(req, res);

  logger.info("New tokens issued for the user", { userId: req.cookies.userId });

  const decoded = verifyJwtToken(tokenData.accessToken, "JWT_ACCESS_SECRET");
  if (!decoded) throw new Error("Failed to decode new access token.");

  attachDecodedUser(req, decoded);
};

export const manageTokensCookies = (
  res: Response,
  action: "add" | "remove",
  tokenData?: IJwtTokens
): void => {
  const tokens = [
    {
      name: "accessToken",
      value: tokenData?.accessToken,
      exp: tokenData?.accessExp,
    },
    {
      name: "refreshToken",
      value: tokenData?.refreshToken,
      exp: tokenData?.refreshExp,
    },
  ];

  tokens.forEach(({ name, value, exp }) => {
    if (action === "add" && value && exp) {
      addCookies(res, name, value, { maxAge: exp });
    } else if (action === "remove") {
      res.clearCookie(name);
    }
  });

  logger.info(`Tokens ${action === "add" ? "added" : "removed"} successfully.`);
};
