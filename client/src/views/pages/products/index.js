import React from "react";
import IndexPage from "../../components/IndexPage";
import Pagination from "../../components/Pagination";
import AddProduct from "./create";
import ListProduct from "./lists";

export default function Products() {
	return (
		<IndexPage header={"Produk"}>
			<div className="flex justify-end">
				<AddProduct />
			</div>
			<ListProduct />
			<Pagination />
		</IndexPage>
	);
}
