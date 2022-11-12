import Product from "../schemas/products.schema.js";

const ProductsController = {
	search: async (req, res) => {
		const { keyword } = req.query;
		await Product.find({ name: { $regex: keyword, $options: "i" } })
			.then((product) => {
				return res.status(200).json({ data: product });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	index: async (req, res) => {
		await Product.find()
			.then((products) => {
				return res.status(200).json({ data: products });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	show: async (req, res) => {
		const { id } = req.params;
		await Product.findById(id)
			.then((product) => {
				return res.status(200).json({ data: product });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	store: async (req, res) => {
		const { name, category, supplier, purchasePrice, salesPrice } = req.body;

		const product = new Product({
			name,
			category,
			supplier,
			purchasePrice,
			salesPrice,
		});

		await product
			.save()
			.then((product) => {
				return res.status(201).json({ data: product });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	update: async (req, res) => {
		const { id } = req.params;
		const { name, category, supplier, purchasePrice, salesPrice } = req.body;

		await Product.findByIdAndUpdate(
			id,
			{
				name,
				category,
				supplier,
				purchasePrice,
				salesPrice,
			},
			{ new: true }
		)
			.then((product) => {
				return res.status(200).json({ data: product });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},

	destroy: async (req, res) => {
		const { id } = req.params;
		await Product.findByIdAndDelete(id)
			.then(() => {
				return res
					.status(200)
					.json({ message: "Product deleted successfully" });
			})
			.catch((err) => {
				return res.status(500).json(err.message);
			});
	},
};

export default ProductsController;
