import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CashSchema = new Schema(
	{
		cash: { type: Number },
	},
	{
		versionKey: false,
	}
);

export default model("Cash", CashSchema);
