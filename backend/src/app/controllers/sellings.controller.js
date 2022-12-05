import mongoose from "mongoose";
import Selling from "../schemas/sellings.schema.js";
import Product from "../schemas/products.schema.js";

const SellingsController = {
	index: async (req, res) => {
		await Selling.find()
			.populate("user", "name -_id")
			.populate("products.product", "name")
			.then((sellings) => {
				return res.status(200).json({ data: sellings });
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

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

	store: async (req, res) => {
		const { items, sellings } = req.body;
		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			const grandTotal = items.reduce((acc, item) => {
				return acc + item.qty * item.price;
			}, 0);

			const selling = await Selling.create(
				[
					{
						user: req.userId,
						products: items,
						grandTotal,
						...sellings,
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

			const sellingPopulated = await Selling.findById(selling[0]._id)
				.populate("user", "name -_id")
				.populate("products.product", "name")
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

	returnItem: async (req, res) => {
		const { items } = req.body;

		const session = await mongoose.startSession();

		try {
			session.startTransaction();
			const selling = await Selling.findById(req.params.id).session(session);

			if (!selling) {
				return res.status(404).json({ message: "Selling not found" });
			}

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

			// calculate total returned (returned qty * price)
			const returnedTotal = items.reduce((acc, item) => {
				const product = selling.products.find((i) => i.product == item.product);
				return acc + item.returnQty * product.price;
			}, 0);

			// update grand total (current grand total - total returned) and update qty for each product
			const sellingUpdated = await Selling.findByIdAndUpdate(
				req.params.id,
				{
					$inc: { grandTotal: -returnedTotal },
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

			// if all product qty is 0, update selling status to returned
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
				.populate("products.product", "name")
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
};

export default SellingsController;
