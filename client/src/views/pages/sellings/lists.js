import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rupiah } from "../../../helpers/currency";
import {
	sellingsSelector,
	getSellings,
} from "../../../redux/features/sellingsSlice";
import SellingDetail from "./detail";

export default function SellingList() {
	const dispatch = useDispatch();
	const sellings = useSelector(sellingsSelector.selectAll);

	useEffect(() => {
		if (!sellings.length) {
			dispatch(getSellings());
		}
	}, [sellings, dispatch]);

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
						{!sellings.length && (
							<tr>
								<td className="p-4 whitespace-nowrap" colSpan="5">
									<div className="text-center text-lg font-semibold mt-56">
										No data
									</div>
								</td>
							</tr>
						)}

						{sellings.map((selling, index) => {
							return (
								<tr
									key={index}
									className="border-b-2 border-gray-200 hover:bg-gray-300"
								>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-medium text-gray-800 truncate">
											{new Date(selling.date).toLocaleString("id-ID", {
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
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">
											{selling.status === "success" ? (
												<span className="flex items-center w-20 justify-center bg-green-500 px-4 rounded-full text-white">
													Selesai
												</span>
											) : selling.status === "hold" ? (
												<span className="flex items-center w-20 justify-center bg-yellow-500 px-4 rounded-full text-white">
													Ditahan
												</span>
											) : (
												""
											)}
										</div>
									</td>
									<td className="p-2 whitespace-nowrap">
										{selling.status === "hold" ? (
											<div className="text-md flex gap-2 justify-center">
												<button className="py-1 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md">
													Lanjut
												</button>

												<button className="py-1 px-4 bg-red-500 hover:bg-red-700 text-white rounded-md">
													Batal
												</button>
											</div>
										) : (
											<div className="text-md flex gap-2 justify-center">
												<SellingDetail id={selling._id} />

												<button className="py-1 px-4 bg-pink-500 hover:bg-pink-700 text-white rounded-md">
													Retur
												</button>
											</div>
										)}
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
