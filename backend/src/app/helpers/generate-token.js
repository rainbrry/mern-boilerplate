import jwt from "jsonwebtoken";
import { accessTokenKey, refreshTokenKey } from "../config/index.js";

export const generateAccessToken = (payload) => {
	return jwt.sign(payload, accessTokenKey, {
		expiresIn: "15m",
	});
};

export const generateRefreshToken = (payload) => {
	return jwt.sign(payload, refreshTokenKey);
};
