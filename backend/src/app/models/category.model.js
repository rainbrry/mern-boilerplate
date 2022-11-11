import mongoose from "mongoose";
import CategorySchema from "../schemas/categories.schema.js";

const { model } = mongoose;

export default model("Category", CategorySchema);
