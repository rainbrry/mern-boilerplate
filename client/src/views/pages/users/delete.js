import React from "react";
import { useDeleteUserMutation } from "../../../services/api/users";
import DeleteModal from "../../components/DeleteModal";

export default function DeleteUser({ id, isDisabled }) {
	const [deleteUser] = useDeleteUserMutation();

	return (
		<DeleteModal id={id} deleteData={deleteUser} isDisabled={isDisabled} />
	);
}
