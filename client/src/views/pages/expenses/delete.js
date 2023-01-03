import React from "react";
import { useDeleteExpenseMutation } from "../../../services/api/expenses";
import DeleteModal from "../../components/DeleteModal";

export default function DeleteExpenses({ isDisabled, id }) {
	const [deleteExpense] = useDeleteExpenseMutation();

	return (
		<DeleteModal id={id} deleteData={deleteExpense} isDisabled={isDisabled} />
	);
}
