import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReturnReportSchema = new Schema(
	{
		sales: { type: Schema.Types.ObjectId, ref: "Selling" },
		user: { type: Schema.Types.ObjectId, ref: "User" },
		details: [
			{
				_id: false,
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				returnQty: { type: Number },
				price: { type: Number },
				total: { type: Number },
				reason: { type: [] },
			},
		],
		buyDate: { type: Date },
		returnDate: { type: Date, default: Date.now },
	},
	{
		versionKey: false,
	}
);

export default model("ReturnReport", ReturnReportSchema);
