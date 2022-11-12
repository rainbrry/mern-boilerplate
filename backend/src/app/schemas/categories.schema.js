import mongoose from "mongoose";

const { Schema } = mongoose;

const CategorySchema = new Schema(
	{
		name: { type: String, required: true, lowercase: true },
	},
	{
		versionKey: false,
	}
);

export default CategorySchema;
