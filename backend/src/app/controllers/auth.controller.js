import User from "../models/user.models.js";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../helpers/generate-token.js";
import {
	encryptPassword,
	verifyPassword,
} from "../helpers/encrypt-password.js";
import { keyName, redisClient } from "../config/index.js";

const AuthController = {
	register: async (req, res) => {
		const { name, username, password, role } = req.body;

		const user = await User.findOne({ username });
		if (user)
			return res.status(400).json({ message: "Username already exists" });

		const newUser = new User({
			name,
			username,
			password: encryptPassword(password),
			role,
		});

		await newUser
			.save()
			.then((user) => {
				const { password, ...newUser } = user._doc;
				return res.status(200).json({ data: newUser });
			})
			.catch((err) => {
				return res.status(400).json({ message: err.message });
			});
	},

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
					sameSite: "lax", // csrf
					path: "/",
				});

				return res
					.status(200)
					.json({ data: { token: accessToken, user: user.fullname } });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	logout: async (req, res) => {
		await redisClient.del(String(req.userId));
		res.clearCookie(keyName);

		return res.status(200).json({ message: "Logout successfully" });
	},

	getAuth: async (req, res) => {
		const user = await User.findById(req.userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		return res.status(200).json({ data: user });
	},

	refreshToken: async (req, res) => {
		const accessToken = generateAccessToken({ id: req.userId });
		const refreshToken = generateRefreshToken({ id: req.userId });

		res.cookie(String(keyName), refreshToken, {
			httpOnly: true, // only server can access the cookie
			sameSite: "lax", // csrf
			path: "/",
		});

		await redisClient.set(String(req.userId), refreshToken);
		return res.status(200).json({ data: accessToken });
	},
};

export default AuthController;
