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
 * @access Public
 */
export const verifyAccessToken = (req, res, next) => {
	const accessToken = req.headers.authorization?.split(" ")[1];
	if (!accessToken) {
		return res.status(403).send({
			message: "No token provided!",
		});
	}

	jwt.verify(accessToken, accessTokenKey, (err, decoded) => {
		if (err) {
			return res.status(405).send({
				message: err.message,
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
 * @access Public
 */
export const verifyRefreshToken = (req, res, next) => {
	const refreshToken = req.cookies[String(keyName)];
	if (!refreshToken) {
		return res.status(403).send({
			message: "No token provided!",
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
				message: "Invalid token",
			});
		}

		req.userId = decoded.id;
		next();
	});
};
