import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rupiah } from "../../../helpers/currency";
import {
	getPurchasings,
	purchasingsSelector,
} from "../../../redux/features/purchasingsSlice";

export default function PurchasingList() {
	const dispatch = useDispatch();
	const purchasings = useSelector(purchasingsSelector.selectAll);

	useEffect(() => {
		if (!purchasings.length) {
			dispatch(getPurchasings());
		}
	}, [dispatch, purchasings.length]);

	return (
		<div className="py-4">
			<div className="w-full h-[450px] bg-base-100 rounded shadow-lg overflow-hidden overflow-y-auto">
				<table className="table-auto w-full">
					<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 border-b-2 text-left">
						<tr>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Tanggal</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Faktur</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Kasir</div>
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
						{purchasings.map((purchasing, index) => {
							return (
								<tr
									key={purchasing._id}
									className="border-b-2 border-gray-200 hover:bg-gray-300"
								>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-medium text-gray-800 capitalize">
											{purchasing.date}
										</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">{purchasing._id}</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">{purchasing.user.name}</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">
											{rupiah(purchasing.grandTotal)}
										</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">
											{purchasing.status === "success" ? (
												<span className="text-white py-1 px-2 bg-teal-400 rounded capitalize">
													{purchasing.status}
												</span>
											) : purchasing.status === "pending" ? (
												<span className="text-white py-1 px-2 bg-yellow-400 rounded capitalize">
													{purchasing.status}
												</span>
											) : purchasing.status === "hold" ? (
												<span className="text-white py-1 px-2 bg-blue-400 rounded capitalize">
													{purchasing.status}
												</span>
											) : purchasing.status === "cancelled" ? (
												<span className="text-white py-1 px-2 bg-red-400 rounded capitalize">
													{purchasing.status}
												</span>
											) : (
												""
											)}
										</div>
									</td>
									<td className="p-2 whitespace-nowrap">
										<div className="text-md flex gap-2 justify-center">
											<button className="px-4 py-1 bg-cyan-600 rounded-lg shadow text-white">
												Detail
											</button>
											<button className="px-4 py-1 bg-green-600 rounded-lg shadow text-white">
												Edit
											</button>
											<button className="px-4 py-1 bg-red-600 rounded-lg shadow text-white">
												Delete
											</button>
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
