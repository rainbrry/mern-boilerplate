import jwt from "jsonwebtoken";
import { accessTokenKey, refreshTokenKey } from "../config/index.js";

/**
 * @param {object} payload
 * @returns {string}
 * @description Generate access token
 * @access Public
 */
export const generateAccessToken = (payload) => {
	return jwt.sign(payload, accessTokenKey, {
		expiresIn: "15m",
	});
};

/**
 * @param {object} payload
 * @returns {string}
 * @description Generate refresh token
 * @access Public
 * @note Refresh token will be stored in redis
 * @note Refresh token will be stored in cookie
 */
export const generateRefreshToken = (payload) => {
	return jwt.sign(payload, refreshTokenKey);
};
