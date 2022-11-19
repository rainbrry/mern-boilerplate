import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SellingSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		products: [
			{
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				qty: { type: Number, required: true },
				salesPrice: { type: Number, required: true },
			},
		],
		grandTotal: { type: Number, required: true },
		status: { type: String, required: true },
		date: { type: Date, default: Date.now },
		notes: { type: String },
	},
	{
		versionKey: false,
	}
);

export default model("Selling", SellingSchema);
