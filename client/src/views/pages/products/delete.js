import React from "react";
import { useDeleteProductMutation } from "../../../services/api/products";
import DeleteModal from "../../components/DeleteModal";

export default function DeleteProduct({ id, isDisabled }) {
	const [deleteProduct] = useDeleteProductMutation();

	return (
		<DeleteModal id={id} deleteData={deleteProduct} isDisabled={isDisabled} />
	);
}
