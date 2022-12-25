import { verifyAccessToken, verifyRefreshToken } from "./token-middleware.js";
import User from "../schemas/users.schema.js";

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @description Check if user is logged in
 * @access Public
 * @middleware verifyAccessToken
 */
export const isLoggedin = (req, res, next) => {
	verifyRefreshToken(req, res, async () => {
		const user = await User.findById(req.userId);
		if (!user) return res.status(404).send({ message: "User Not found." });

		verifyAccessToken(req, res, async () => {
			const user = await User.findById(req.userId);
			if (!user) return res.status(404).send({ message: "User Not found." });

			req.user = user;
			next();
		});
	});
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @description Check user role is admin
 * @access Public
 * @middleware isLoggedin
 */
export const isAdmin = (req, res, next) => {
	isLoggedin(req, res, () => {
		if (req.user.role !== "admin") {
			return res.status(403).send({ message: "You're not allowed" });
		}
		next();
	});
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @description Check user role is cashier
 * @access Public
 * @middleware isLoggedin
 */
export const isCashier = (req, res, next) => {
	isLoggedin(req, res, () => {
		if (req.user.role !== "kasir") {
			return res.status(403).send({ message: "You're not allowed!" });
		}

		next();
	});
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @description Check user role is owner
 * @access Public
 * @middleware isLoggedin
 * @note Owner role is the highest role
 * @note Owner role can access all routes
 */
export const isOwner = (req, res, next) => {
	isLoggedin(req, res, () => {
		if (req.user.role !== "owner") {
			return res.status(403).send({ message: "You're not allowed!" });
		}
		next();
	});
};
