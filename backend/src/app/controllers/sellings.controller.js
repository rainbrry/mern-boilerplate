import Selling from "../schemas/sellings.schema.js";

const SellingsController = {
	index: async (req, res) => {
		try {
			const sellings = await Selling.find()
				.populate("user", "name")
				.populate("items.product", "name")
				.sort({ date: -1 });

			res.json({ data: sellings });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
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
		try {
			const selling = new Selling(req.body);

			await selling.save();

			res.json({ message: "Selling created successfully", data: selling });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
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
