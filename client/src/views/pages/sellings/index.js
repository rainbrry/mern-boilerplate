import React from "react";
import { NavLink } from "react-router-dom";
import IndexPage from "../../components/IndexPage";
import Pagination from "../../components/Pagination";
import ListSellings from "./lists";

export default function Sellings() {
	return (
		<IndexPage header={"Penjualan"}>
			<div className="flex justify-end">
				<NavLink
					to={"/new-selling"}
					className="px-8 py-2 bg-blue-500 hover:bg-blue-700 rounded-md shadow-md text-white"
				>
					Tambah transaksi
				</NavLink>
			</div>

			<ListSellings />

			<Pagination />
		</IndexPage>
	);
}
