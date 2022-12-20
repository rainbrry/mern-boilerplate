import mongoose from "mongoose";
import Selling from "../schemas/sellings.schema.js";
import Product from "../schemas/products.schema.js";
import SalesReport from "../schemas/sales-reports.schema.js";
import ReturnReport from "../schemas/return-report.schema.js";
import Expense from "../schemas/expenses.schema.js";

const SellingsController = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get all sellings
	 * @route GET /api/sellings
	 * @access Admin & Cashier
	 */
	index: async (req, res) => {
		const today = new Date().setHours(0, 0, 0, 0);
		await Selling.find({ createdAt: { $gte: today } })
			.limit(15)
			.sort({ createdAt: -1, startTime: -1 })
			.populate("user", "name -_id")
			.populate("products.product", "name purchasePrice")
			.then((sellings) => {
				return res.status(200).json({ data: sellings });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Search selling by invoice
	 * @route GET /api/sellings/search/:query
	 * @access Admin & Cashier
	 */
	search: async (req, res) => {
		const { query } = req.query;
		await Selling.find({
			invoice: { $regex: query, $options: "i" },
		})
			.populate("user", "name -_id")
			.populate("products.product", "name")
			.then((selling) => {
				return res.status(200).json({ data: selling });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get selling by id
	 * @route GET /api/sellings/:id
	 * @access Cashier
	 */
	show: async (req, res) => {
		await Selling.findById(req.params.id)
			.populate("user", "name -_id")
			.populate("products.product", "name")
			.then((selling) => {
				return res.status(201).json({ data: selling });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Create new selling
	 * @route POST /api/sellings
	 * @access Cashier
	 */
	store: async (req, res) => {
		const { items, paymentMethod } = req.body;

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			const grandTotal = items.reduce((acc, item) => {
				return acc + item.qty * item.price;
			}, 0);

			const totalProfit = items.reduce((acc, item) => {
				return acc + item.qty * (item.price - item.purchasePrice);
			}, 0);

			const selling = await Selling.create(
				[
					{
						user: req.userId,
						products: items,
						grandTotal,
						totalProfit,
						paymentMethod,
					},
				],
				{ session }
			);

			Product.bulkWrite(
				items.map((item) => ({
					updateOne: {
						filter: { _id: item.product },
						update: { $inc: { stock: -item.qty } },
					},
				})),
				{ new: true, session }
			);

			await SalesReport.create(
				[
					{
						sales: selling[0]._id,
						user: req.userId,
						details: items,
						grandTotal,
						totalProfit,
						paymentMethod,
					},
				],
				{ session }
			);

			const sellingPopulated = await Selling.findById(selling[0]._id)
				.where("date")
				.gte(new Date().setHours(0, 0, 0, 0))
				.limit(15)
				.sort({ date: -1, startTime: -1 })
				.populate("user", "name -_id")
				.populate("products.product", "name purchasePrice")
				.session(session);

			await session.commitTransaction();
			return res.status(201).json({ data: sellingPopulated });
		} catch (err) {
			await session.abortTransaction();
			return res.status(500).json({ message: err.message });
		} finally {
			session.endSession();
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Update selling
	 * @route PUT /api/sellings/:id
	 * @access Cashier
	 * @todo
	 * 1. Update selling
	 * 2. Update product stock
	 * 3. Update selling total
	 * 4. Update selling grand total
	 * 5. Return item
	 * 6. Update selling status
	 * 7. Update selling return date
	 * 8. Update selling return reason
	 * 9. Update selling return status
	 * 10. Update selling return by
	 * 11. Update selling return note
	 */
	returnItem: async (req, res) => {
		const { items } = req.body;

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			// find selling
			const selling = await Selling.findById(req.params.id);

			// get product from items where return qty is not 0, then create return reports
			const returnedItems = items.filter((item) => item.returnQty != 0);

			// calculate total returned (returned qty * price)
			const returnedTotal = returnedItems.reduce((acc, item) => {
				return acc + item.returnQty * item.price;
			}, 0);

			// calculate total profit (returned qty * (price - purchase price))
			const returnedProfit = items.reduce((acc, item) => {
				return acc + item.returnQty * (item.price - item.purchasePrice);
			}, 0);

			if (!selling) {
				return res.status(404).json({ message: "Selling not found" });
			}

			// map items
			items.map(async (item) => {
				const product = selling.products.find((i) => i.product == item.product);

				// if old product is exist
				if (product) {
					// if returned reason is not broken, update product stok (current stock + return qty)
					if (!item.reason.includes("broken")) {
						await Product.findByIdAndUpdate(
							item.product,
							{
								$inc: { stock: +item.returnQty },
							},
							{ new: true, session }
						);
					}

					// if returned qty more than product qty, return error
					if (item.returnQty > product.qty) {
						return res.status(400).json({
							message: `Return qty more than product qty for product ${product.product.name}`,
						});
					}
				}
			});

			// update grand total (current grand total - total returned) and update qty for each product
			const sellingUpdated = await Selling.findByIdAndUpdate(
				req.params.id,
				{
					$inc: { grandTotal: -returnedTotal, totalProfit: -returnedProfit },
					products: items,
				},
				{ new: true, session }
			);

			// pull product where qty is 0
			const updatedSellingStatus = await Selling.findByIdAndUpdate(
				sellingUpdated._id,
				{
					$pull: { products: { qty: 0 } },
				},
				{ new: true, session }
			);

			if (returnedItems.length != 0) {
				await ReturnReport.create(
					[
						{
							sales: selling._id,
							user: req.userId,
							details: returnedItems,
							buyDate: selling.createdAt,
						},
					],
					{ session }
				);

				await Expense.create(
					[
						{
							type: "retur barang",
							typeId: selling._id,
							user: req.userId,
							amount: returnedTotal,
							description:
								"Pengembalian barang dari penjualan dengan nomor transaksi " +
								selling._id,
						},
					],
					{ session }
				);
			}

			if (updatedSellingStatus.products.length == 0) {
				await Selling.findByIdAndUpdate(
					updatedSellingStatus._id,
					{ $set: { status: "returned" } },
					{ new: true, session }
				);
			}

			// populate user and product name
			const sellingPopulated = await Selling.findById(updatedSellingStatus._id)
				.populate("user", "name -_id")
				.populate("products.product", "name purchasePrice")
				.session(session);

			await session.commitTransaction();
			return res.status(201).json({ data: sellingPopulated });
		} catch (err) {
			await session.abortTransaction();
			return res.status(500).json({ message: err.message });
		} finally {
			session.endSession();
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Delete selling
	 * @route DELETE /api/sellings/:id
	 * @access Cashier
	 * @todo
	 * 1. Delete selling
	 * 2. Update product stock if qty is not 0
	 */
	destroy: async (req, res) => {
		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			const selling = await Selling.findById(req.params.id).session(session);

			if (!selling) {
				return res.status(404).json({ message: "Selling not found" });
			}

			selling.products.map(async (item) => {
				// if qty is not 0, update product stock (current stock + qty)
				if (item.qty != 0) {
					await Product.findByIdAndUpdate(
						item.product,
						{
							$inc: { stock: +item.qty },
						},
						{ new: true, session }
					);
				}
			});

			await Selling.findByIdAndDelete(req.params.id).session(session);

			await session.commitTransaction();
			return res.status(200).json({ message: "Selling deleted" });
		} catch (err) {
			await session.abortTransaction();
			return res.status(500).json({ message: err.message });
		} finally {
			session.endSession();
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Report selling
	 * @route GET /api/sales-report
	 * @access Admin
	 */
	report: async (req, res) => {
		const today = new Date().setHours(0, 0, 0, 0);

		await SalesReport.find()
			.where("createdAt")
			.gte(today)
			.populate("user", "name -_id")
			.populate("details.product", "name -_id")
			.then((reports) => {
				return res.status(200).json({ data: reports });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Report return selling
	 * @route GET /api/return-reports
	 * @access Admin
	 */
	returnReports: async (req, res) => {
		const today = new Date().setHours(0, 0, 0, 0);

		await ReturnReport.find()
			.where("returnDate")
			.gte(today)
			.populate("user", "name -_id")
			.populate("details.product", "name -_id")
			.then((reports) => {
				return res.status(200).json({ data: reports });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},
};

export default SellingsController;
