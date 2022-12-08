import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

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

UserSchema.plugin(mongoosePaginate);

export default model("User", UserSchema);
