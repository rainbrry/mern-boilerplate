import mongoose from "mongoose";
import Purchasing from "../schemas/purchasings.schema.js";
import Product from "../schemas/products.schema.js";

const PurchasingController = {
	index: async (req, res) => {
		await Purchasing.find()
			.populate("user", "name -_id")
			.populate("products.product", "name")
			.then((purchasings) => {
				return res.status(200).json({ data: purchasings });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	show: async (req, res) => {
		await Purchasing.findById(req.params.id)
			.populate("user", "name -_id")
			.populate("products.product", "name")
			.then((purchasing) => {
				return res.status(201).json({ data: purchasing });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	store: async (req, res) => {
		const { items, grandTotal } = req.body;
		const session = await mongoose.startSession();

		try {
			session.startTransaction();
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

			Product.bulkWrite(
				items.map((item) => ({
					updateOne: {
						filter: { _id: item.product },
						update: { $inc: { stock: item.qty } },
					},
				})),
				{ new: true, session }
			);

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

	update: async (req, res) => {
		const { items, grandTotal } = req.body;
		const session = await mongoose.startSession();

		try {
			session.startTransaction();
			const purchasing = await Purchasing.findById(req.params.id).session(
				session
			);

			if (!purchasing) {
				return res.status(404).json({ message: "Pembelian tidak ditemukan" });
			}

			purchasing.products.map(async (item) => {
				if (!items.find((i) => i.product == item.product)) {
					await Product.findByIdAndUpdate(
						item.product,
						{
							$inc: { stock: -item.qty },
						},
						{ new: true, session }
					);

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
				const product = purchasing.products.find(
					(i) => i.product == item.product
				);

				if (product) {
					await Product.findByIdAndUpdate(
						item.product,
						{
							$inc: { stock: item.qty - product.qty },
						},
						{ new: true, session }
					);
				} else {
					await Product.findByIdAndUpdate(
						item.product,
						{
							$inc: { stock: item.qty },
						},
						{ new: true, session }
					);
				}
			});

			const purchasingUpdated = await Purchasing.findByIdAndUpdate(
				req.params.id,
				{
					user: req.userId,
					products: items,
					grandTotal,
				},
				{ new: true, session }
			);

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
