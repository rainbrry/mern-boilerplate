import mongoose from "mongoose";
import Product from "../schemas/products.schema.js";
import Purchasing from "../schemas/purchasings.schema.js";
import PurchasingReport from "../schemas/purchasing-reports.schema.js";

const PurchasingController = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get all purchasings
	 * @route GET /api/purchasings
	 * @access Admin
	 */
	index: async (req, res) => {
		const today = new Date().setHours(0, 0, 0, 0);
		await Purchasing.find({ createdAt: { $gte: today } })
			.limit(15)
			.sort({ createdAt: -1, startTime: -1 })
			.populate("user", "name -_id")
			.populate("products.product", "name")
			.then((purchasings) => {
				return res.status(200).json(purchasings);
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Search purchasing by invoice
	 * @route GET /api/purchasings/search/:query
	 * @access Admin
	 */
	search: async (req, res) => {
		const { query } = req.query;
		await Purchasing.find({ invoice: { $regex: query, $options: "i" } })
			.populate("user", "name -_id")
			.populate("products.product", "name")
			.then((purchasing) => {
				return res.status(200).json(purchasing);
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get purchasing by id
	 * @route GET /api/purchasings/:id
	 * @access Admin
	 */
	show: async (req, res) => {
		await Purchasing.findById(req.params.id)
			.sort({ date: -1 })
			.populate("user", "name -_id")
			.populate("products.product", "name")
			.then((purchasing) => {
				return res.status(201).json({ data: purchasing });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Store purchasing
	 * @route POST /api/purchasings
	 * @access Admin
	 * @todo Refactor this function
	 * @todo Add transaction
	 * @todo Add validation
	 * @todo Add error handling
	 * @todo Add error response
	 * @todo Add success response
	 * @todo Add success message
	 * @todo Add error message
	 * @todo Add status code
	 */
	store: async (req, res) => {
		const { items } = req.body;

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			// calculate grand total
			const grandTotal = items.reduce((acc, item) => {
				return acc + item.qty * item.price;
			}, 0);

			// create purchasing
			const purchasing = await Purchasing.create(
				[
					{
						user: req.userId,
						products: items,
						grandTotal,
					},
				],
				{ session }
			);

			// update product stock
			await Product.bulkWrite(
				items.map((item) => ({
					updateOne: {
						filter: { _id: item.product },
						update: { $inc: { stock: item.qty } },
					},
				})),
				{ new: true, session }
			);

			// create purchasing report
			await PurchasingReport.create(
				[
					{
						purchasing: purchasing[0]._id,
						user: req.userId,
						details: items,
						grandTotal,
						status: "sold",
					},
				],
				{ session }
			);

			// populate purchasing
			const purchasingPopulated = await Purchasing.findById(purchasing[0]._id)
				.populate("user", "name -_id")
				.populate("products.product", "name")
				.session(session);

			await session.commitTransaction();

			return res.status(201).json({
				message: "Pembelian berhasil disimpan",
				data: purchasingPopulated,
				status: 201,
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
	 * @description Update purchasing
	 * @route PUT /api/purchasings/:id
	 * @access Admin
	 */
	update: async (req, res) => {
		const { qty, productId, actions } = req.body;
		const session = await mongoose.startSession();

		try {
			// start transaction
			session.startTransaction();

			// get purchasing
			const purchasing = await Purchasing.findById(req.params.id).session(
				session
			);
			// if purchasing is not found return 404
			if (!purchasing) {
				return res.status(404).json({ message: "Pembelian tidak ditemukan" });
			}

			// get product from purchasing by product id from request body, then update qty
			const product = purchasing.products.find(
				(product) => product.product == productId
			);

			// if actions is update
			if (actions === "update") {
				// update product stock
				await Product.findOneAndUpdate(
					{ _id: productId },
					{ $inc: { stock: qty - product.qty } },
					{ new: true, session }
				);
			}

			if (actions === "remove") {
				// update product stock
				await Product.findOneAndUpdate(
					{ _id: productId },
					{ $inc: { stock: -product.qty } },
					{ new: true, session }
				);

				// remove product from purchasing
				purchasing.products = purchasing.products.filter(
					(product) => product.product != productId
				);
			}

			// update purchasing product qty
			product.qty = qty;

			// re-calculate grand total
			const grandTotal = purchasing.products.reduce((acc, item) => {
				return acc + item.qty * item.price;
			}, 0);

			// update purchasing grand total and products (qty is updated)
			await Purchasing.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: { grandTotal, products: purchasing.products } },
				{ new: true, session }
			);

			// create purchasing report
			await PurchasingReport.findOneAndUpdate(
				{ purchasing: req.params.id },
				{
					$set: {
						details: purchasing.products,
						grandTotal,
						status: "updated",
					},
				},
				{ new: true, session }
			);

			// populate purchasing
			const purchasingPopulated = await Purchasing.findById(req.params.id)
				.populate("user", "name -_id")
				.populate("products.product", "name")
				.session(session);

			await session.commitTransaction();

			return res.status(200).json({
				message: "Pembelian berhasil diubah",
				data: purchasingPopulated,
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
	 * @description Delete purchasing
	 * @route DELETE /api/purchasings/:id
	 * @access Protected
	 * @access Admin
	 */
	destroy: async (req, res) => {
		const session = await mongoose.startSession();

		try {
			// start transaction
			session.startTransaction();

			// get purchasing
			const purchasing = await Purchasing.findById(req.params.id).session(
				session
			);

			// if purchasing is not found return 404
			if (!purchasing) {
				return res.status(404).json({ message: "Pembelian tidak ditemukan" });
			}

			// update product stock
			purchasing.products.map(async (item) => {
				await Product.findByIdAndUpdate(
					item.product,
					{
						$inc: { stock: -item.qty },
					},
					{ new: true, session }
				);
			});

			// update purchasing report
			await PurchasingReport.findOneAndDelete(
				{ purchasing: req.params.id },
				{ session }
			);

			// delete purchasing
			await Purchasing.findByIdAndDelete(req.params.id, { session });

			// commit transaction
			await session.commitTransaction();

			return res.status(201).json({ message: "Pembelian berhasil dihapus" });
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
	 * @description Report purchasing
	 * @route GET /api/purchasing-reports
	 * @access Protected
	 * @access Admin
	 */
	report: async (req, res) => {
		const today = new Date().setHours(0, 0, 0, 0);

		await PurchasingReport.find()
			.where("createdAt")
			.gte(today)
			.populate("user", "name -_id")
			.populate("details.product", "name -_id")
			.then((reports) => {
				return res.status(200).json(reports);
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},
};

export default PurchasingController;
