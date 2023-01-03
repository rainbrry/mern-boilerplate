import React from "react";
import { useDeletePurchasingMutation } from "../../../services/api/purchasings";
import DeleteModal from "../../components/DeleteModal";

export default function DeletePurchasing({ id, isDisabled }) {
	const [deletePurchasing] = useDeletePurchasingMutation();

	return (
		<DeleteModal
			id={id}
			deleteData={deletePurchasing}
			isDisabled={isDisabled}
		/>
	);
}
