import Selling from "../schemas/sellings.schema.js";
import Expense from "../schemas/expenses.schema.js";
import Cash from "../schemas/cash.schema.js";

const DashboardController = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get dashboard data
	 * @route GET /api/dashboard
	 * @access Cashier
	 * @access Admin
	 * @access Owner
	 */
	index: async (req, res) => {
		const chart = [];

		for (let i = 6; i >= 0; i--) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			const start = new Date(date).setHours(0, 0, 0, 0);
			const end = new Date(date).setHours(23, 59, 59, 999);

			const sellings = await Selling.find()
				.where("status")
				.equals("success")
				.where("date")
				.gte(start)
				.lte(end)
				.exec();

			const revenue = sellings.reduce((acc, cur) => {
				return acc + cur.grandTotal;
			}, 0);

			chart.push({
				date: date.toISOString().slice(0, 10),
				revenue,
				sales: sellings.length,
			});
		}

		const expenses = await Expense.find()
			.where("date")
			.gte(new Date().setHours(0, 0, 0, 0))
			.exec();

		const todaysRevenue = chart[chart.length - 1].revenue;
		const todaysSales = chart[chart.length - 1].sales;
		const todaysExpenses = expenses.reduce((acc, cur) => {
			return acc + cur.amount;
		}, 0);

		return res
			.status(200)
			.json({ data: { todaysRevenue, todaysSales, todaysExpenses, chart } });
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Set cash
	 * @route POST /api/dashboard/cash
	 * @access Cashier
	 * @access Admin
	 */
	setCash: async (req, res) => {
		const { cash } = req.body;

		if (!cash) {
			return res.status(400).json({ error: "Cash is required" });
		}

		// get cash
		const cashData = await Cash.find();

		// if not cash, create new cash
		if (cashData.length === 0) {
			const newCash = new Cash({ cash });
			await newCash.save();
			return res.status(200).json({ data: newCash });
		}

		// if cash, update cash
		cashData[0].cash = cash;
		await cashData[0].save();

		return res.status(200).json({ data: cashData });
	},
};

export default DashboardController;
