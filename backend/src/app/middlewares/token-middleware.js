import jwt from "jsonwebtoken";
import {
	accessTokenKey,
	refreshTokenKey,
	redisClient,
	keyName,
} from "../config/index.js";

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @description Verify access token from header
 * @note Get access token from header, verify it, and check if it's valid
 * @note If it's valid, then set req.userId to decoded id
 * @note If it's invalid, then send error message
 * @note If there's no access token, then send error message
 * @note this middleware is used in public routes, and it's used to get public data, if there's no access token, user can't get public data
 */
export const verifyAccessToken = (req, res, next) => {
	const accessToken = req.headers.authorization?.split(" ")[1];
	if (!accessToken) {
		return res.status(405).send({
			message: "Invalid token!",
		});
	}

	jwt.verify(accessToken, accessTokenKey, (err, decoded) => {
		if (err) {
			return res.status(405).send({
				message: "Invalid token!",
			});
		}
		req.userId = decoded.id;
		next();
	});
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @description Verify refresh token from cookie
 * @note Get refresh token from cookie, verify it, and check if it's valid
 * @note If it's valid, then set req.userId to decoded.id
 * @note Then call next() to continue to the next middleware
 * @note If it's not valid, then return 401 status code
 * @note If there's no refresh token, then return 403 status code
 * @note refresh token in cookie is used for auth user, so it's not necessary to set it to expire, because it will be deleted when user logout.
 * @note this middleware is used in /api/refresh-token for refreshing access token
 * @note this middleware is used in /api/logout for checking if user is logged in
 * @note this middlewware is used in /api/get-auth for checking if user is logged in
 */
export const verifyRefreshToken = (req, res, next) => {
	const refreshToken = req.cookies[String(keyName)];
	if (!refreshToken) {
		return res.status(401).send({
			message: "Unauthorized!",
		});
	}

	jwt.verify(refreshToken, refreshTokenKey, async (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!",
			});
		}

		const validToken = await redisClient.get(String(decoded.id));
		if (refreshToken !== validToken) {
			return res.status(401).send({
				message: "Unauthorized!",
			});
		}

		req.userId = decoded.id;
		next();
	});
};
