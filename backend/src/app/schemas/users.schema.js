import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		username: { type: String, required: true },
		role: { type: String, default: "kasir" },
		password: { type: String, required: true, select: false },
	},
	{
		versionKey: false,
	}
);

export default UserSchema;
