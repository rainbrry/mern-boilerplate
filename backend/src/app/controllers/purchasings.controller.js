import mongoose from "mongoose";
import Purchasing from "../schemas/purchasings.schema.js";
import Product from "../schemas/products.schema.js";

const PurchasingController = {
	index: async (req, res) => {
		await Purchasing.find()
			.populate("user", "name -_id")
			.then((purchasings) => {
				return res.json({ data: purchasings });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	show: async (req, res) => {
		await Purchasing.findById(req.params.id)
			.then((purchasing) => {
				return res.json({ data: purchasing });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	store: async (req, res) => {
		const { items, purchasings } = req.body;

		const session = await mongoose.startSession();
		session.startTransaction();

		await Purchasing.create({
			user: req.userId,
			items,
			...purchasings,
		})
			.then(async (purchasing) => {
				items.map(async (item) => {
					await Product.findByIdAndUpdate(item._id, {
						$inc: { stock: item.qty },
					});
				});

				await session.commitTransaction();
				await session.endSession();

				return res.status(201).json({
					message: "Purchasing created successfully",
					data: purchasing,
				});
			})
			.catch(async (err) => {
				await session.abortTransaction();
				await session.endSession();

				return res.status(500).json({ message: err.message });
			});
	},

	update: async (req, res) => {
		await Purchasing.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
			.then((purchasing) => {
				return res.json({ message: "Berhasil diupdate", data: purchasing });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	destroy: async (req, res) => {
		await Purchasing.findByIdAndDelete(req.params.id)
			.then(() => {
				return res.json({ message: "Berhasil dihapus" });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	returnItem: async (req, res) => {
		await Purchasing.findById(req.params.id)
			.then(async (purchasing) => {
				purchasing.products.forEach(async (product) => {
					await product
						.findByIdAndUpdate(product._id, {
							$inc: { stock: product.quantity },
						})
						.then((product) => {
							return res.json({ message: "Berhasil dikembalikan" });
						});
				});
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},
};

export default PurchasingController;
