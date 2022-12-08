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
		const options = {
			page: req.query.page || 1,
			limit: req.query.limit || 15,
			sort: { date: -1 },
			populate: [
				{ path: "user", select: "name -_id" },
				{ path: "products.product", select: "name" },
			],
		};

		await Purchasing.paginate({}, options)
			.then((purchasings) => {
				return res.status(200).json({ data: purchasings });
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
				return res.status(200).json({ data: purchasing });
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
			Product.bulkWrite(
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
						description: `Pembelian dengan invoice ${purchasing[0]._id}`,
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
		const { items } = req.body;
		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			// calculate grand total
			const grandTotal = items.reduce((acc, item) => {
				return acc + item.qty * item.price;
			}, 0);

			// get purchasing
			const purchasing = await Purchasing.findById(req.params.id).session(
				session
			);

			if (!purchasing) {
				return res.status(404).json({ message: "Pembelian tidak ditemukan" });
			}

			purchasing.products.map(async (item) => {
				// check if product is not in items
				if (!items.find((i) => i.product == item.product)) {
					// update product stock - qty
					await Product.findByIdAndUpdate(
						item.product,
						{
							$inc: { stock: -item.qty },
						},
						{ new: true, session }
					);

					// remove product from purchasing
					await Purchasing.findByIdAndUpdate(
						req.params.id,
						{
							$pull: { products: { product: item.product } },
						},
						{ new: true, session }
					);
				}
			});

			items.map(async (item) => {
				// check if product is in purchasing
				const product = purchasing.products.find(
					(i) => i.product == item.product
				);

				// if product is in purchasing
				if (product) {
					// update product stock + item.qty - item.qty before
					await Product.findByIdAndUpdate(
						item.product,
						{
							$inc: { stock: item.qty - product.qty },
						},
						{ new: true, session }
					);
				} else {
					// update product stock + item.qty
					await Product.findByIdAndUpdate(
						item.product,
						{
							$inc: { stock: item.qty },
						},
						{ new: true, session }
					);
				}
			});

			// update purchasing
			const purchasingUpdated = await Purchasing.findByIdAndUpdate(
				req.params.id,
				{
					user: req.userId,
					products: items,
					grandTotal,
				},
				{ new: true, session }
			);

			// populate purchasing
			const purchasingPopulated = await Purchasing.findById(
				purchasingUpdated._id
			)
				.populate("user", "name -_id")
				.populate("products.product", "name")
				.session(session);

			await session.commitTransaction();

			return res.status(201).json({
				message: "Pembelian berhasil diubah",
				data: purchasingPopulated,
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
			session.startTransaction();

			const purchasing = await Purchasing.findById(req.params.id).session(
				session
			);

			purchasing.products.map(async (item) => {
				await Product.findByIdAndUpdate(
					item.product,
					{
						$inc: { stock: -item.qty },
					},
					{ new: true, session }
				);
			});

			await Purchasing.findByIdAndDelete(req.params.id, { session });

			await session.commitTransaction();

			return res.status(201).json({ message: "Pembelian berhasil dihapus" });
		} catch (err) {
			await session.abortTransaction();

			return res.status(500).json({ message: err.message });
		} finally {
			session.endSession();
		}
	},
};

export default PurchasingController;
