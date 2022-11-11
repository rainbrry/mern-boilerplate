import React from "react";
import AddProduct from "./create";
import ListProducts from "./lists";

export default function Products() {
	return (
		<div className="px-8 py-4">
			<h3 className="text-2xl text-base-500">Products</h3>

			<div className="flex justify-end">
				<AddProduct />
			</div>

			<ListProducts />

			<div className="w-full flex justify-center">
				<div className="flex justify-center gap-10 w-96 items-center px-2  h-10 bg-base-100 rounded shadow-lg">
					<span className="block">Previous</span>
					<span className="block">1</span>
					<span className="block">2</span>
					<span className="block">3</span>
					<span className="block">4</span>
					<span className="block">Next</span>
				</div>
			</div>
		</div>
	);
}
