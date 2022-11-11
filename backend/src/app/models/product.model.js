import mongoose from "mongoose";
import ProductSchema from "../schemas/products.schema.js";

const { model } = mongoose;

export default model("Product", ProductSchema);
