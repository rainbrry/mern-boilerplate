import React from "react";
import { NavLink } from "react-router-dom";
import IndexPage from "../../components/IndexPage";
import ListPurchasings from "./lists";
import Pagination from "../../components/Pagination";

export default function Purchasings() {
	return (
		<IndexPage header={"Pembelian"}>
			<div className="flex justify-end">
				<NavLink
					to={"/new-purchasing"}
					className="px-8 py-2 bg-blue-500 hover:bg-blue-700 rounded-md shadow-md text-white"
				>
					Tambah transaksi
				</NavLink>
			</div>
			<ListPurchasings />

			<Pagination />
		</IndexPage>
	);
}
