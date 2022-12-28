import React from "react";
import { NavLink } from "react-router-dom";
import { rupiah } from "../../../helpers/currency";
import { useGetPurchasingsQuery } from "../../../services/api/purchasings";
import PurchasingDetail from "./detail";
import DeletePurchasing from "./delete";

export default function ListPurchasings() {
	const { data: purchasings = [] } = useGetPurchasingsQuery();

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
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Status</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold text-center">Actions</div>
							</th>
						</tr>
					</thead>
					<tbody className="text-md divide-y text-left divide-gray-100">
						{!purchasings.length && (
							<tr>
								<td className="p-4 whitespace-nowrap" colSpan="5">
									<div className="text-center text-lg font-semibold mt-56">
										No data
									</div>
								</td>
							</tr>
						)}

						{purchasings.map((purchasing, index) => {
							return (
								<tr
									key={index}
									className="border-b-2 border-gray-200 hover:bg-gray-300"
								>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-medium text-gray-800 capitalize">
											{new Date(purchasing.createdAt).toLocaleString("id-ID", {
												year: "numeric",
												month: "numeric",
												day: "numeric",
												hour: "numeric",
												minute: "numeric",
											})}
										</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">{purchasing._id}</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">
											{rupiah(purchasing.grandTotal)}
										</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">
											{purchasing.status === "success" ? (
												<span className="flex items-center w-20 justify-center bg-teal-500 px-4 rounded-full text-white">
													Selesai
												</span>
											) : purchasing.status === "hold" ? (
												<span className="flex items-center w-20 justify-center bg-yellow-500 px-4 rounded-full text-white">
													Ditahan
												</span>
											) : (
												""
											)}
										</div>
									</td>
									<td className="p-2 whitespace-nowrap">
										<div className="text-md flex gap-2 justify-center items-center">
											<PurchasingDetail purchasing={purchasing} />
											<NavLink
												to={`/edit-purchasing/${purchasing._id}`}
												className="px-4 py-0.5 bg-green-600 rounded-lg shadow text-white hover:bg-green-700"
											>
												Edit
											</NavLink>
											<DeletePurchasing id={purchasing._id} />
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
