import Supplier from "../models/supplier.model.js";

const SuppliersController = {
	search: async (req, res) => {
		const { keyword } = req.query;
		await Supplier.find({ name: { $regex: keyword, $options: "i" } })
			.then((supplier) => {
				return res.status(200).json({ data: supplier });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	index: async (req, res) => {
		await Supplier.find()
			.then((suppliers) => {
				return res.status(200).json({ data: suppliers });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	show: async (req, res) => {
		const { id } = req.params;
		await Supplier.findById(id)
			.then((supplier) => {
				return res.status(200).json({ data: supplier });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	store: async (req, res) => {
		const { name, address, phone, email } = req.body;

		const supplier = new Supplier({
			name,
			address,
			phone,
			email,
		});

		await supplier
			.save()
			.then((supplier) => {
				return res.status(201).json({ data: supplier });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	update: async (req, res) => {
		const { id } = req.params;
		const { name, address, phone, email } = req.body;

		await Supplier.findByIdAndUpdate(
			id,
			{
				name,
				address,
				phone,
				email,
			},
			{ new: true }
		)
			.then((supplier) => {
				return res.status(200).json({ data: supplier });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	destroy: async (req, res) => {
		const { id } = req.params;
		await Supplier.findByIdAndDelete(id)
			.then((supplier) => {
				return res
					.status(200)
					.json({ message: "Supplier deleted successfully" });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},
};

export default SuppliersController;
