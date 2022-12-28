import Product from "../schemas/products.schema.js";

const ProductsController = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get all products
	 * @route GET /api/products
	 * @access Admin && Cashier
	 */
	index: async (req, res) => {
		await Product.find()
			.limit(15)
			.sort({ name: 1 })
			.then((products) => {
				return res.status(200).json(products);
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Search product by name
	 * @route GET /api/products/search/:query
	 * @access Admin && Cashier
	 * @todo Add pagination
	 * @todo Add sort
	 * @todo Add limit
	 * @todo Add offset
	 * @todo Add filter
	 * @todo Add search
	 * @todo Add sort
	 */
	search: async (req, res) => {
		const { search } = req.query;
		await Product.find({
			$or: [
				{ name: { $regex: search, $options: "i" } },
				{ category: { $regex: search, $options: "i" } },
				{ supplier: { $regex: search, $options: "i" } },
			],
		})
			.then((products) => {
				return res.status(200).json(products);
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get product by id
	 * @route GET /api/product/:id
	 * @access Admin && Cashier
	 */
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

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Create new product
	 * @route POST /api/product
	 * @access Admin
	 * @todo Add validation
	 * @todo Add error handling
	 */
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

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Update product by id
	 * @route PUT /api/product/:id
	 * @access Admin
	 * @todo Add validation
	 * @todo Add error handling
	 */
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

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Delete product by id
	 * @route DELETE /api/product/:id
	 * @access Admin
	 * @todo Add validation
	 * @todo Add error handling
	 */
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
