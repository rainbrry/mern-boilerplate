import React from "react";
import AddExpense from "./create";
import ExpensesList from "./lists";

export default function Expenses() {
	return (
		<div className="px-8 py-4">
			<h3 className="text-2xl text-base-500">Pengeluaran</h3>

			<div className="flex justify-end">
				<AddExpense />
			</div>

			<ExpensesList />

			<div className="w-full flex justify-center">
				<div className="flex justify-center gap-10 w-96 items-center px-2  h-10 bg-base-100 rounded shadow-lg">
					<span className="block">Previous</span>
					<span className="block">1</span>
					<span className="block">2</span>
					<span className="block">3</span>
					<span className="block">4</span>
					<span className="block">Next</span>
				</div>
			</div>
		</div>
	);
}
