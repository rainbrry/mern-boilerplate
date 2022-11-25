import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SellingSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		products: [
			{
				_id: false,
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				qty: { type: Number, required: true },
				price: { type: Number, required: true },
			},
		],
		grandTotal: { type: Number, required: true },
		pay: { type: Number, required: true },
		paymentMethod: { type: String, required: true },
		status: { type: String, required: true },
		notes: { type: String },
		date: { type: Date, default: Date.now },
	},
	{
		timeStamps: true,
		versionKey: false,
	}
);

export default model("Selling", SellingSchema);
