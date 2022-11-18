import React from "react";

export default function SellingList() {
	return (
		<div className="py-4">
			<div className="w-full h-[450px] bg-base-100 rounded shadow-lg overflow-hidden overflow-y-auto">
				<table className="table-auto w-full">
					<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 border-b-2 text-left">
						<tr>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">#</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Name</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Username</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Role</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold text-center">Actions</div>
							</th>
						</tr>
					</thead>
					<tbody className="text-md divide-y text-left divide-gray-100"></tbody>
				</table>
			</div>
		</div>
	);
}
