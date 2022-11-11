import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getProducts,
	productsSelector,
} from "../../../redux/features/productsSlice";
import EditProduct from "./edit";
import DeleteProduct from "./delete";

export default function ListProducts() {
	const dispatch = useDispatch();
	const products = useSelector(productsSelector.selectAll);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);
	return (
		<div className="py-4">
			<div className="w-full h-[450px] bg-base-100 rounded shadow-lg overflow-hidden overflow-y-auto">
				<table className="table-auto w-full">
					<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 border-b-2 text-left">
						<tr>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Name</div>
							</th>
							<th className="p-4 whitespace-nowrap">
								<div className="font-semibold">Category</div>
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
						{products.map((product, index) => {
							return (
								<tr
									key={product._id}
									className="border-b-2 border-gray-200 hover:bg-gray-300"
								>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-medium text-gray-800 capitalize">
											{product.name}
										</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">{product.category}</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">{product.purchasePrice}</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">{product.salesPrice}</div>
									</td>
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="font-normal">{product.stock}</div>
									</td>
									<td className="p-2 whitespace-nowrap">
										<div className="text-md text-center flex gap-2 justify-center">
											<EditProduct product={product} />
											<DeleteProduct id={product._id} />
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
