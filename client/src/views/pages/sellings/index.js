import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import IndexPage from "../../components/IndexPage";
import Pagination from "../../components/Pagination";
import ListSellings from "./lists";

export default function Sellings() {
	const { auth } = useSelector((state) => state);

	return (
		<IndexPage header={"Penjualan"}>
			{auth.role === "kasir" && (
				<div className="flex justify-end">
					<NavLink
						to={"/new-selling"}
						className="px-8 py-2 bg-blue-500 hover:bg-blue-700 rounded-md shadow-md text-white"
					>
						Tambah transaksi
					</NavLink>
				</div>
			)}

			<ListSellings />

			<Pagination />
		</IndexPage>
	);
}
