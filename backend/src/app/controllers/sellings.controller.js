import mongoose from "mongoose";
import Selling from "../schemas/sellings.schema.js";
import Product from "../schemas/products.schema.js";
import Expenses from "../schemas/expenses.schema.js";
import SalesReport from "../schemas/sales-reports.schema.js";
import ReturnReport from "../schemas/return-report.schema.js";

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
				return res.status(200).json(sellings);
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
				return res.status(200).json(selling);
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
			.populate("products.product", "name purchasePrice")
			.then((selling) => {
				return res.status(201).json(selling);
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
			return res.status(201).json(sellingPopulated);
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
		const { productId, price, purchasePrice, returnQty, qty, reason } =
			req.body;

		const session = await mongoose.startSession();
		const returnedItems = [
			{
				product: productId,
				price,
				returnQty,
				total: price * returnQty,
				reason,
			},
		];

		try {
			session.startTransaction();

			// get selling by id, return 404 if selling not found
			const selling = await Selling.findById(req.params.id).session(session);
			if (!selling) {
				return res.status(404).json({ message: "Selling not found" });
			}

			const product = selling.products.find(
				(product) => product.product == productId
			);

			if (!reason.includes("broken")) {
				// update product stock
				await Product.findByIdAndUpdate(
					productId,
					{
						$inc: { stock: returnQty },
					},
					{ new: true, session }
				);
			}

			// calculate returned total and returned profit
			const returnedTotal = returnQty * product.price;
			const returnedProfit = returnQty * (product.price - purchasePrice);

			// update selling and grand total, total profit and product qty
			await Selling.findByIdAndUpdate(
				req.params.id,
				{
					$inc: {
						grandTotal: -returnedTotal,
						totalProfit: -returnedProfit,
						[`products.$[product].qty`]: -returnQty,
					},
				},
				{
					new: true,
					arrayFilters: [{ "product.product": productId }],
					session,
				}
			);

			if (product.qty === Number(returnQty)) {
				const removeProduct = await Selling.findByIdAndUpdate(
					req.params.id,
					{
						$pull: { products: { product: productId } },
					},
					{ new: true, session }
				);

				if (removeProduct.products.length == 0) {
					await Selling.findByIdAndUpdate(
						req.params.id,
						{
							$set: { status: "returned" },
						},
						{ new: true, session }
					);
				}
			}

			// create or update return report
			const returnReport = await ReturnReport.findOneAndUpdate(
				{ sales: req.params.id },
				{
					user: req.userId,
					sales: req.params.id,
					$push: { details: returnedItems },
					$inc: {
						total: returnedTotal,
						profit: returnedProfit,
					},
					buyDate: selling.createdAt,
				},
				{
					new: true,
					upsert: true,
					session,
				}
			);

			await Expenses.create(
				[
					{
						type: "return item",
						user: req.userId,
						amount: returnedTotal,
						description: `Return barang dengan no transaksi ${selling._id}`,
						status: "success",
					},
				],
				{ session }
			);

			const sellingPopulated = await Selling.findById(req.params.id)
				.populate("user", "name -_id")
				.populate("products.product", "name purchasePrice")
				.session(session);

			await session.commitTransaction();
			return res.status(200).json({
				message: "Item returned",
				data: sellingPopulated,
				status: 200,
			});
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
	 * @route DELETE /api/selling/:id
	 * @access Cashier
	 */
	destroy: async (req, res) => {
		await Selling.findByIdAndDelete(req.params.id);
		return res.status(200).json({ message: "Selling deleted" });
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
