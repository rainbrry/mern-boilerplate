import mongoose from "mongoose";

const { Schema } = mongoose;

const SupplierSchema = new Schema(
	{
		name: { type: String, required: true },
		address: { type: String },
		phone: { type: String },
		email: { type: String },
	},
	{
		versionKey: false,
	}
);

export default SupplierSchema;
