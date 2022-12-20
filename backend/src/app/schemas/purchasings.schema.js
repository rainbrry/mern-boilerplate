import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

const PurchasingSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		products: [
			{
				_id: false,
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				price: { type: Number, required: true },
				qty: { type: Number, required: true },
			},
		],
		grandTotal: { type: Number, required: true },
		status: { type: String, required: true, default: "success" },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

PurchasingSchema.plugin(mongoosePaginate);

export default model("Purchasing", PurchasingSchema);
