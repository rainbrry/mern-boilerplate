import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ExpenseSchema = new Schema(
	{
		type: { Type: String },
		amount: { Type: Number },
		description: { Type: String },
		date: { Type: Date },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("Expense", ExpenseSchema);
