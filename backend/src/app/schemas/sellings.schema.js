import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
		paymentMethod: { type: String, required: true },
		pay: { type: Number, required: true },
		status: { type: String, required: true, default: "success" },
		date: { type: Date, default: Date.now },
	},
	{
		timeStamps: true,
		versionKey: false,
	}
);

SellingSchema.plugin(mongoosePaginate);

export default model("Selling", SellingSchema);
