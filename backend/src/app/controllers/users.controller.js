import User from "../models/user.models.js";
import createError from "http-errors";
import { encryptPassword } from "../helpers/encrypt-password.js";

const UsersController = {
	index: async (req, res) => {
		await User.find()
			.then((users) => {
				return res.status(200).json({ data: users });
			})
			.catch(() => {
				return next(createError.InternalServerError("Something went wrong"));
			});
	},

	show: async (req, res) => {
		const user = await User.findById(req.params.id);
		res.json(user);
	},

	store: async (req, res) => {
		const { name, username, role, password } = req.body;

		// check if username already exists
		const user = await User.findOne({ username });
		if (user) {
			return res.status(400).json({ message: "Username already exists" });
		}

		// request
		const newUser = new User({
			name,
			username,
			password: encryptPassword(password),
			role,
		});

		// save user to database
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

	update: async (req, res) => {
		console.log(req.body);
		await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
			.then((user) =>
				res
					.status(200)
					.json({ message: "User updated successfully", data: user })
			)
			.catch((err) => res.status(400).json(err));
	},

	destroy: async (req, res) => {
		await User.findByIdAndDelete(req.params.id)
			.then(() => {
				return res.status(200).json({ message: "User deleted successfully" });
			})
			.catch(() => {
				return next(createError.InternalServerError("Something went wrong"));
			});
	},
};

export default UsersController;
