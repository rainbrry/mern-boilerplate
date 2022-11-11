import mongoose from "mongoose";
import UserSchema from "../schemas/users.schema.js";

const { model } = mongoose;

export default model("User", UserSchema);
