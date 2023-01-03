import React from "react";
import { useDeleteSellingMutation } from "../../../services/api/sellings";
import DeleteModal from "../../components/DeleteModal";

export default function DeleteSelling({ id, isDisabled }) {
	const [deleteSelling] = useDeleteSellingMutation();

	return (
		<DeleteModal id={id} deleteData={deleteSelling} isDisabled={isDisabled} />
	);
}
