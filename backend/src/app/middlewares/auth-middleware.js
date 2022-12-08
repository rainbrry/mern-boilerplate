import { verifyAccessToken } from "./token-middleware.js";
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
	verifyAccessToken(req, res, async () => {
		const user = await User.findById(req.userId, { password: 0 });
		if (!user) return res.status(404).send({ message: "User Not found." });

		req.user = user;
		next();
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
	isLoggedin(req, res, async () => {
		if (req.user.role !== "admin") {
			return res.status(403).send({ message: "Require Admin Role!" });
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
	isLoggedin(req, res, async () => {
		if (req.user.role !== "kasir") {
			return res.status(403).send({ message: "Require Cashier Role!" });
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
	isLoggedin(req, res, async () => {
		if (req.user.role !== "owner") {
			return res.status(403).send({ message: "Require Owner Role!" });
		}
		next();
	});
};
