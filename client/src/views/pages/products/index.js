import React from "react";
import IndexPage from "../../components/IndexPage";
import AddProduct from "./create";
import ListProduct from "./lists";

export default function Products() {
	return (
		<IndexPage header={"Produk"}>
			<div className="flex justify-end">
				<AddProduct />
			</div>
			<ListProduct />
		</IndexPage>
	);
}
