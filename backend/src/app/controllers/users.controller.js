import User from "../schemas/users.schema.js";
import createError from "http-errors";
import { encryptPassword } from "../helpers/encrypt-password.js";

const UsersController = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get all users
	 * @route GET /api/users
	 * @access Admin
	 */
	index: async (req, res) => {
		await User.paginate({}, { page: req.query.page, limit: 10 })
			.then((users) => {
				return res.status(200).json({ data: users });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Search user by username or name
	 * @route GET /api/users/search/:query
	 * @access Admin
	 */
	search: async (req, res) => {
		await User.find({
			$or: [
				{ username: { $regex: req.params.query, $options: "i" } },
				{ name: { $regex: req.params.query, $options: "i" } },
			],
		})
			.then((user) => {
				return res.status(200).json({ data: user });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get user by id
	 * @route GET /api/users/:id
	 * @access Admin
	 */
	show: async (req, res) => {
		await User.findById(req.params.id)
			.then((user) => {
				return res.status(200).json({ data: user });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Create new user
	 * @route POST /api/user
	 * @access Admin
	 */
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

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Update user by id
	 * @route PUT /api/user/:id
	 * @access Admin
	 */
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

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Delete user by id
	 * @route DELETE /api/user/:id
	 * @access Admin
	 */
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
