import React from "react";

export default function Table() {
	return (
		<table className="table-auto w-full">
			<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 border-b-2 text-left">
				<tr>
					<th className="p-4 whitespace-nowrap">
						<div className="font-semibold">Name</div>
					</th>
					<th className="p-4 whitespace-nowrap">
						<div className="font-semibold">Purchase price</div>
					</th>
					<th className="p-4 whitespace-nowrap">
						<div className="font-semibold">Sales price</div>
					</th>
					<th className="p-4 whitespace-nowrap">
						<div className="font-semibold">Stock</div>
					</th>
					<th className="p-4 whitespace-nowrap">
						<div className="font-semibold text-center">Actions</div>
					</th>
				</tr>
			</thead>
			<tbody className="text-md divide-y text-left divide-gray-100">
				
			</tbody>
		</table>
	);
}
