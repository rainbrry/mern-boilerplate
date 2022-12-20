import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PurchasingReportSchema = new Schema(
	{
		purchasing: { type: Schema.Types.ObjectId, ref: "Purchasing" },
		user: { type: Schema.Types.ObjectId, ref: "User" },
		details: [
			{
				_id: false,
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				qty: { type: Number },
				price: { type: Number },
				total: { type: Number },
			},
		],
		grandTotal: { type: Number },
		description: { type: String },
		notes: { type: String },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("PurchasingReport", PurchasingReportSchema);
