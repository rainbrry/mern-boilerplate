import mongoose from "mongoose";
import Selling from "../schemas/sellings.schema.js";
import Product from "../schemas/products.schema.js";

const SellingsController = {
	index: async (req, res) => {
		await Selling.find()
			.populate("user", "name _id")
			.populate("products.product", "name -_id")
			.exec((err, sellings) => {
				if (err) return res.status(500).json({ message: err.message });
				return res.status(200).json({ data: sellings });
			});
	},

	show: async (req, res) => {
		try {
			const selling = await Selling.findById(req.params.id)
				.populate("user", "name")
				.populate("items.product", "name");

			res.json({ data: selling });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	store: async (req, res) => {
		const { items, sellings } = req.body;

		const session = await mongoose.startSession();
		session.startTransaction();

		await Selling.create({
			user: req.userId,
			products: items,
			...sellings,
		})
			.then(async (selling) => {
				items.map(async (item) => {
					await Product.findByIdAndUpdate(item._id, {
						$inc: { stock: -item.qty },
					});
				});

				await session.commitTransaction();
				session.endSession();

				return res
					.status(201)
					.json({ message: "Transaksi berhasil disimpan", data: selling });
			})
			.catch(async (error) => {
				await session.abortTransaction();
				session.endSession();

				return res.status(500).json({ message: error.message });
			});
	},

	update: async (req, res) => {
		try {
			const selling = await Selling.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});

			res.json({ message: "Selling updated successfully", data: selling });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	destroy: async (req, res) => {
		try {
			await Selling.findByIdAndDelete(req.params.id);

			res.json({ message: "Selling deleted" });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	returnSelling: async (req, res) => {
		try {
			const selling = await Selling.findById(req.params.id);

			if (selling.status === "returned") {
				return res.status(400).json({ message: "Selling already returned" });
			}

			selling.status = "returned";
			await selling.save();

			res.json(selling);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

export default SellingsController;
