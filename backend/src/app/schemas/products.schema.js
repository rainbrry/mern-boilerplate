import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

ProductSchema.plugin(mongoosePaginate);

export default model("Product", ProductSchema);
