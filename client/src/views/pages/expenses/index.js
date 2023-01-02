import React from "react";
import IndexPage from "../../components/IndexPage";
import AddExpenses from "./create";
import ListExpenses from "./lists";
import Pagination from "../../components/Pagination";

export default function Expenses() {
	return (
		<IndexPage header={"Pengeluaran"}>
			<div className="flex justify-end">
				<AddExpenses />
			</div>
			<ListExpenses />

			<Pagination />
		</IndexPage>
	);
}
