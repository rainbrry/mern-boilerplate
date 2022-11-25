import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PurchasingSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		items: [
			{
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				price: { type: Number, required: true },
				qty: { type: Number, required: true },
			},
		],
		grandTotal: { type: Number, required: true },
		status: { type: String, required: true },
		date: { type: Date, default: Date.now },
	},
	{
		versionKey: false,
	}
);

export default model("Purchasing", PurchasingSchema);
