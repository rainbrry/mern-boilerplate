import { verifyAccessToken } from "./token-middleware.js";
import User from "../models/user.models.js";

export const isLoggedin = (req, res, next) => {
	verifyAccessToken(req, res, async () => {
		const user = await User.findById(req.userId, { password: 0 });
		if (!user) return res.status(404).send({ message: "User Not found." });

		req.user = user;
		next();
	});
};

export const isAdmin = (req, res, next) => {
	isLoggedin(req, res, async () => {
		if (req.user.role !== "admin") {
			return res.status(403).send({ message: "Require Admin Role!" });
		}
		next();
	});
};

export const isCashier = (req, res, next) => {
	isLoggedin(req, res, async () => {
		if (req.user.role !== "kasir") {
			return res.status(403).send({ message: "Require Cashier Role!" });
		}
		next();
	});
};

export const isOwner = (req, res, next) => {
	isLoggedin(req, res, async () => {
		if (req.user.role !== "owner") {
			return res.status(403).send({ message: "Require Owner Role!" });
		}
		next();
	});
};
