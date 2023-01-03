import React from "react";
import { rupiah } from "../../../helpers/currency";
import { useGetProductsQuery } from "../../../services/api/products";
import DetailProduct from "./detail";
import EditProduct from "./edit";
import DeleteProduct from "./delete";

export default function ListProducts() {
	const { data: products = [], isLoading, isError } = useGetProductsQuery();

	return (
		<div className="py-4">
			<div className="w-full h-[600px] bg-base-100 rounded shadow-lg overflow-hidden overflow-y-auto">
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
						{isLoading ? (
							<tr>
								<td className="p-4 whitespace-nowrap" colSpan="5">
									<div className="text-center text-lg font-semibold mt-56">
										Loading...
									</div>
								</td>
							</tr>
						) : isError || !products.length ? (
							<tr>
								<td className="p-4 whitespace-nowrap" colSpan="5">
									<div className="text-center text-lg font-semibold mt-56">
										No data
									</div>
								</td>
							</tr>
						) : (
							products.map((product, index) => {
								return (
									<tr
										key={product._id}
										className="border-b-2 border-gray-200 hover:bg-gray-300"
									>
										<td className="px-4 py-2 whitespace-nowrap">
											<div className="font-medium text-gray-800 capitalize w-80 truncate">
												{product.name}
											</div>
										</td>
										<td className="px-4 py-2 whitespace-nowrap">
											<div className="font-normal">
												{rupiah(product.purchasePrice)}
											</div>
										</td>
										<td className="px-4 py-2 whitespace-nowrap">
											<div className="font-normal">
												{rupiah(product.salesPrice)}
											</div>
										</td>
										<td className="px-4 py-2 whitespace-nowrap">
											<div className="font-normal">{product.stock}</div>
										</td>
										<td className="p-2 whitespace-nowrap">
											<div className="text-md flex gap-2 justify-center">
												<DetailProduct product={product} />
												<EditProduct product={product} />
												<DeleteProduct id={product._id} />
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
