import React from "react";
import { rupiah } from "../../../helpers/currency";
import { useGetExpensesQuery } from "../../../services/api/expenses";
import DetailExpenses from "./detail";
import EditExpenses from "./edit";
import DeleteExpenses from "./delete";

export default function ListExpenses() {
	const { data: expenses = [], isLoading, isError } = useGetExpensesQuery();

	return (
		<div className="py-4">
			<div className="w-full h-[600px] bg-base-100 rounded shadow-lg overflow-hidden overflow-y-auto">
				<table className="table-auto w-full">
					<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 border-b-2 text-left">
						<tr>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Tanggal</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Jenis pengeluaran</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Petugas</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Jumlah</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold text-center">Actions</div>
							</th>
						</tr>
					</thead>
					<tbody className="text-md divide-y text-left divide-gray-100">
						{isLoading ? (
							<tr>
								<td className="p-4 whitespace-nowrap" colSpan="5">
									<div className="text-center text-lg font-semibold mt-56">
										Loading...
									</div>
								</td>
							</tr>
						) : isError || !expenses.length ? (
							<tr>
								<td className="p-4 whitespace-nowrap" colSpan="5">
									<div className="text-center text-lg font-semibold mt-56">
										No data
									</div>
								</td>
							</tr>
						) : (
							expenses.map((expense, index) => (
								<tr
									key={expense._id}
									className="border-b-2 border-gray-200 hover:bg-gray-300"
								>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">
											{new Date(expense.createdAt).toLocaleDateString("id-ID", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">
											{expense.type === "other" ? "Lainnya" : expense.type}
										</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">{expense.user.name}</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">{rupiah(expense.amount)}</div>
									</td>
									<td className="p-2 whitespace-nowrap">
										<div className="text-md flex justify-center gap-2">
											<DetailExpenses expense={expense} />
											<EditExpenses expense={expense} />
											<DeleteExpenses id={expense._id} />
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
