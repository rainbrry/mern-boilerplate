import Expense from "../schemas/expenses.schema.js";

const ExpensesController = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get dashboard data
	 * @route GET /api/expenses
	 * @access Cashier
	 * @access Admin
	 * @access Owner
	 */
	index: async (req, res) => {
		await Expense.find()
			.where("createdAt")
			.gte(new Date().setHours(0, 0, 0, 0))
			.sort({ createdAt: -1 })
			.populate("user", "name -_id")
			.then((expenses) => {
				return res.status(200).json(expenses);
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get expense data by id
	 * @route GET /api/expenses/:id
	 * @access Cashier
	 * @access Admin
	 * @access Owner
	 */
	show: async (req, res) => {
		await Expense.findById(req.params.id)
			.populate("user", "name -_id")
			.then((expense) => {
				return res.status(200).json(expense);
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Create new expense
	 * @route POST /api/expense
	 * @access Cashier
	 * @access Admin
	 */
	store: async (req, res) => {
		const expense = new Expense({
			...req.body,
			user: req.user._id,
		});

		expense.save((err, expense) => {
			if (err) {
				return res.status(500).json({ message: err.message });
			}

			expense.populate("user", "name -_id", (err, expense) => {
				if (err) {
					return res.status(500).json({ message: err.message });
				}

				return res.status(201).json(expense);
			});
		});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Update expense data by id
	 * @route PUT /api/expense/:id
	 */
	update: async (req, res) => {
		await Expense.findByIdAndUpdate(req.params.id, req.body).then((expense) => {
			return res.status(200).json(expense);
		});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Delete expense data by id
	 * @route DELETE /api/expense/:id
	 */
	destroy: async (req, res) => {
		await Expense.findByIdAndDelete(req.params.id).then((expense) => {
			return res.status(200).json(expense);
		});
	},
};

export default ExpensesController;
