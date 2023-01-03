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
		// get sellings from 7 days ago
		const sellings = await Selling.find()
			.where("createdAt")
			.gte(new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000)
			.exec();

		const expenses = await Expense.find()
			.where("createdAt")
			.gte(new Date().setHours(0, 0, 0, 0));

		// filter todays sellings
		const todaysSellings = sellings.filter((selling) => {
			const sellingDate = new Date(selling.createdAt);
			return (
				sellingDate.getDate() === new Date().getDate() &&
				sellingDate.getMonth() === new Date().getMonth() &&
				sellingDate.getFullYear() === new Date().getFullYear()
			);
		});

		// get todays revenue
		const todaysRevenue = todaysSellings.reduce((acc, cur) => {
			return acc + cur.grandTotal;
		}, 0);

		// get todays profit
		const todaysProfit = todaysSellings.reduce((acc, cur) => {
			return acc + cur.totalProfit;
		}, 0);

		// get todays sales
		const todaysSales = todaysSellings.length;

		// get todays expenses
		const todaysExpenses = expenses.reduce((acc, cur) => {
			return acc + cur.amount;
		}, 0);

		return res.status(200).json({
			sellings,
			todaysRevenue,
			todaysProfit,
			todaysSales,
			todaysExpenses,
		});
	},

	// index: async (req, res) => {
	// 	const chart = [];

	// 	// get sellings from 7 days ago
	// 	const sellings = await Selling.find()
	// 		.where("createdAt")
	// 		.gte(new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000)
	// 		.exec();

	// 	// get expenses
	// 	const expenses = await Expense.find()
	// 		.where("createdAt")
	// 		.gte(new Date().setHours(0, 0, 0, 0))
	// 		.exec();

	// 	// push data to chart, loop 7 times
	// 	for (let i = 6; i >= 0; i--) {
	// 		// get date from 7 days ago
	// 		const date = new Date();
	// 		date.setDate(date.getDate() - i);

	// 		// filter sellings by date from 7 days ago
	// 		const filteredSellings = sellings.filter((selling) => {
	// 			const sellingDate = new Date(selling.createdAt);
	// 			return (
	// 				sellingDate.getDate() === date.getDate() &&
	// 				sellingDate.getMonth() === date.getMonth() &&
	// 				sellingDate.getFullYear() === date.getFullYear()
	// 			);
	// 		});

	// 		// get revenue from filtered sellings
	// 		const revenue = filteredSellings.reduce((acc, cur) => {
	// 			return acc + cur.grandTotal;
	// 		}, 0);

	// 		// get profit from filtered sellings
	// 		const profit = filteredSellings.reduce((acc, cur) => {
	// 			return acc + cur.totalProfit;
	// 		}, 0);

	// 		// push data to chart
	// 		chart.push({
	// 			date: date.toISOString().slice(0, 10),
	// 			sales: filteredSellings.length,
	// 			revenue,
	// 			profit,
	// 		});
	// 	}

	// 	const todaysRevenue = chart[chart.length - 1].revenue;
	// 	const todaysSales = chart[chart.length - 1].sales;
	// 	const todaysProfit = chart[chart.length - 1].profit;
	// 	const todaysExpenses = expenses.reduce((acc, cur) => {
	// 		return acc + cur.amount;
	// 	}, 0);

	// 	return res.status(200).json({
	// 		data: {
	// 			todaysRevenue,
	// 			todaysSales,
	// 			todaysExpenses,
	// 			todaysProfit,
	// 			chart,
	// 		},
	// 	});
	// },
};

export default DashboardController;
