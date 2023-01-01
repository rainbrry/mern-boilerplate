import React from "react";
import { NavLink } from "react-router-dom";
import { rupiah } from "../../../helpers/currency";
import {
	useDeleteSellingMutation,
	useGetSellingsQuery,
} from "../../../services/api/sellings";
import SellingDetail from "./detail";

export default function ListSellings() {
	const { data: sellings = [], isLoading, isError } = useGetSellingsQuery();
	const [deleteSelling] = useDeleteSellingMutation();

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
								<div className="font-semibold">Invoice</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Total</div>
							</th>
							<th className="p-4 whitespace-nowrap text-center">
								<div className="font-semibold">Status</div>
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
						) : isError || !sellings.length ? (
							<tr>
								<td className="p-4 whitespace-nowrap" colSpan="5">
									<div className="text-center text-lg font-semibold mt-56">
										No data
									</div>
								</td>
							</tr>
						) : (
							sellings.map((selling, index) => {
								return (
									<tr
										key={index}
										className="border-b-2 border-gray-200 hover:bg-gray-300"
									>
										<td className="px-4 py-2 whitespace-nowrap">
											<div className="font-medium text-gray-800 capitalize">
												{new Date(selling.createdAt).toLocaleString("id-ID", {
													year: "numeric",
													month: "numeric",
													day: "numeric",
													hour: "numeric",
													minute: "numeric",
												})}
											</div>
										</td>

										<td className="px-4 py-2 whitespace-nowrap">
											<div className="font-normal">{selling._id}</div>
										</td>

										<td className="px-4 py-2 whitespace-nowrap">
											<div className="font-normal">
												{rupiah(selling.grandTotal)}
											</div>
										</td>

										<td className="px-4 py-2 whitespace-nowrap text-center w-28">
											<div
												className={`px-4 font-normal rounded-full text-white flex items-center justify-center ${
													selling.status === "sold"
														? "bg-green-500"
														: "bg-red-500"
												}`}
											>
												{selling.status === "sold" ? "Sold" : "Returned"}
											</div>
										</td>

										<td className="p-2 whitespace-nowrap">
											<div className="text-md flex gap-2 justify-center items-center">
												<SellingDetail selling={selling} />

												{selling.status === "sold" ? (
													<NavLink
														to={`/return-selling/${selling._id}`}
														className="px-4 py-0.5 bg-yellow-500 rounded-lg shadow text-white hover:bg-yellow-700"
													>
														Retur
													</NavLink>
												) : (
													<button
														onClick={() => deleteSelling(selling._id)}
														className="px-4 py-0.5 bg-red-600 rounded-lg shadow text-white hover:bg-red-700"
													>
														Hapus
													</button>
												)}
											</div>
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
