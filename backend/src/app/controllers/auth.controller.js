import User from "../schemas/users.schema.js";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../helpers/generate-token.js";
import { verifyPassword } from "../helpers/encrypt-password.js";
import { keyName, redisClient } from "../config/index.js";

const AuthController = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Login user
	 * @route POST /api/auth/login
	 * @access Public
	 */
	login: async (req, res) => {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const user = await User.findOne({ username }).select(["+password"]);
		if (!user) return res.status(404).json({ message: "User not found" });

		const validPassword = verifyPassword(user.password);
		if (password !== validPassword)
			return res.status(401).json({ message: "Invalid credentials" });

		const accessToken = generateAccessToken({ id: user._id });
		const refreshToken = generateRefreshToken({ id: user._id });

		if (req.cookies[String(keyName)]) req.cookies[String(keyName)] = "";

		await redisClient.set(String(user._id), refreshToken);

		await user
			.save()
			.then((user) => {
				res.cookie(String(keyName), refreshToken, {
					httpOnly: true, // only server can access the cookie
					sameSite: "lax",
					path: "/",
				});

				return res
					.status(200)
					.json({ token: accessToken, user: user.name, role: user.role });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Logout user
	 * @route POST /api/auth/logout
	 * @access Private
	 * @middleware auth
	 */
	logout: async (req, res) => {
		res.clearCookie(keyName);
		return res.status(200).json({ message: "Logout successfully" });
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Refresh token
	 * @route POST /api/auth/refresh-token
	 * @access Private
	 * @middleware auth
	 * @middleware refresh-token
	 * @middleware check-refresh-token
	 */
	refreshToken: async (req, res) => {
		const accessToken = generateAccessToken({ id: req.userId });
		const refreshToken = generateRefreshToken({ id: req.userId });

		res.cookie(String(keyName), refreshToken, {
			httpOnly: true, // only server can access the cookie
			sameSite: "lax", // csrf
			path: "/",
		});

		await redisClient.set(String(req.userId), refreshToken);
		return res.status(200).json({ token: accessToken });
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get auth
	 * @route GET /api/get-auth
	 */
	getAuth: async (req, res) => {
		const user = await User.findById(req.userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		return res.status(200).json({ user: user.name });
	},
};

export default AuthController;
