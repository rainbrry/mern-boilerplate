import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema(
	{
		name: { type: String, required: true },
		category: { type: Schema.Types.ObjectId, ref: "Category" },
		supplier: { type: Schema.Types.ObjectId, ref: "Supplier" },
		purchasePrice: { type: Number, required: true },
		salesPrice: { type: Number, required: true },
		stock: { type: Number, required: true, default: 0 },
		markup: { type: Number, required: true },
	},
	{
		versionKey: false,
	}
);

export default ProductSchema;
