import React from "react";
import { rupiah } from "../../../helpers/currency";
import { generatePDF } from "../../../helpers/generate-pdf";
import { useGetSalesReportsQuery } from "../../../services/api/reports";

export default function SalesReports() {
	const {
		data: salesReports = [],
		isLoading,
		isError,
	} = useGetSalesReportsQuery();

	const totalRevenue = salesReports.reduce(
		(acc, curr) => acc + curr.grandTotal,
		0
	);

	const totalProfit = salesReports.reduce(
		(acc, curr) => acc + curr.totalProfit,
		0
	);

	return (
		<div className="px-8 py-4">
			<h3 className="text-2xl text-base-500">Laporan Penjualan</h3>
			<div className="flex flex-row justify-end">
				<button
					onClick={() => generatePDF("Laporan-penjualan.pdf")}
					className="px-4 py-2 rounded bg-blue-500 shadow-lg text-white hover:bg-blue-700"
				>
					Export PDF
				</button>
			</div>

			<div className="py-4">
				<div className="h-[660px] bg-base-100 rounded shadow-lg overflow-hidden overflow-y-auto">
					<div id="report" className="">
						<table className="table-fixed w-full border-r border-l border-t">
							<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 text-left border-b overflow-hidden">
								<tr>
									<th className="py-4 px-6 whitespace-nowrap w-3/12">
										<div className="font-semibold">Invoice</div>
									</th>
									<th className="py-4 px-6 whitespace-nowrap w-4/12">
										<div className="font-semibold">Nama barang</div>
									</th>
									<th className="p-4 whitespace-nowrap text-center w-2/12">
										<div className="font-semibold">Harga</div>
									</th>
									<th className="p-4 whitespace-nowrap text-center w-1/12">
										<div className="font-semibold">Qty</div>
									</th>
									<th className="p-4 whitespace-nowrap text-center w-2/12">
										<div className="font-semibold text-center">Total</div>
									</th>
								</tr>
							</thead>
							<tbody className="text-md divide-y text-left divide-gray-100 overflow-hidden">
								{isLoading ? (
									<tr>
										<td className="p-4 whitespace-nowrap" colSpan="5">
											<div className="text-center text-lg font-semibold mt-56">
												Loading...
											</div>
										</td>
									</tr>
								) : isError || !salesReports.length ? (
									<tr>
										<td className="p-4 whitespace-nowrap" colSpan="5">
											<div className="text-center text-lg font-semibold mt-56">
												No data
											</div>
										</td>
									</tr>
								) : (
									salesReports.map((report) =>
										report.details.map((detail, index) => (
											<tr key={index} className="hover:bg-gray-300">
												<td className="px-6 py-2 whitespace-nowrap border-b truncate w-3/12">
													{report.sales}
												</td>
												<td className="px-6 py-2 whitespace-nowrap border-b truncate w-4/12">
													{detail.product.name}
												</td>
												<td className="px-4 py-2 whitespace-nowrap border-b text-center w-2/12">
													{rupiah(detail.price)}
												</td>
												<td className="px-4 py-2 whitespace-nowrap border-b text-center w-1/12">
													{detail.qty}
												</td>
												<td className="px-4 py-2 whitespace-nowrap border-b text-center w-2/12">
													{rupiah(detail.price * detail.qty)}
												</td>
											</tr>
										))
									)
								)}
							</tbody>

							{!salesReports.length ? (
								""
							) : (
								<tfoot>
									<tr className="bg-gray-50">
										<td
											colSpan={5}
											className="px-6 py-1 whitespace-nowrap truncate w-3/12 text-right"
										>
											<div className="font-semibold">
												Total pemasukan : {rupiah(totalRevenue || "")}
											</div>
										</td>
									</tr>
									<tr className="bg-gray-50">
										<td
											colSpan={5}
											className="px-6 py-2 whitespace-nowrap truncate w-3/12 text-right border-b"
										>
											<div className="font-semibold">
												Total laba bersih: {rupiah(totalProfit || "")}
											</div>
										</td>
									</tr>
								</tfoot>
							)}
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
