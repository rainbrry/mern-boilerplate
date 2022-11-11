import mongoose from "mongoose";
import SupplierSchema from "../schemas/suppliers.schema.js";

const { model } = mongoose;

export default model("Supplier", SupplierSchema);
