import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
	{
		name: { type: String, required: true, lowercase: true },
		category: { type: String, lowercase: true },
		supplier: { type: String, lowercase: true },
		purchasePrice: { type: Number, required: true },
		salesPrice: { type: Number, required: true },
		stock: { type: Number, required: true, default: 0 },
	},
	{
		versionKey: false,
	}
);

export default model("Product", ProductSchema);
