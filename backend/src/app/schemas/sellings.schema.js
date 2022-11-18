import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SellingSchema = new Schema({
	invoice: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	items: [
		{
			_id: false,
			product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
			qty: { type: Number, required: true, required: true },
			salesPrice: { type: Number, required: true, required: true },
		},
	],
	grandTotal: { type: Number, required: true },
	status: { type: String, required: true },
	date: { type: Date, default: Date.now },
});

export default model("Selling", SellingSchema);
