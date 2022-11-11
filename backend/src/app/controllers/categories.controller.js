import Category from "../models/category.model.js";

const CategoriesController = {
	search: async (req, res) => {
		const { name } = req.query;
		const category = await Category.find({
			name: { $regex: name, $options: "i" },
		});
		return res.json({ data: category });
	},

	index: async (req, res) => {
		await Category.find()
			.then((categories) => {
				return res.status(200).json({ data: categories });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	show: async (req, res) => {
		const { id } = req.params;
		await Category.findById(id)
			.then((category) => {
				return res.status(200).json({ data: category });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	store: async (req, res) => {
		const { name } = req.body;

		const category = new Category({
			name,
		});

		await category
			.save()
			.then((category) => {
				return res.status(201).json({ data: category });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	update: async (req, res) => {
		const { id } = req.params;
		const { name } = req.body;

		await Category.findByIdAndUpdate(
			id,
			{
				name,
			},
			{ new: true }
		)
			.then((category) => {
				return res.status(200).json({ data: category });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	destroy: async (req, res) => {
		const { id } = req.params;
		await Category.findByIdAndDelete(id)
			.then((category) => {
				return res
					.status(200)
					.json({ message: "Category deleted successfully" });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},
};

export default CategoriesController;
