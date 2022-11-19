import React from "react";
import { NavLink } from "react-router-dom";
import SellingList from "./lists";

export default function Sellings() {
	return (
		<div className="px-8 py-4">
			<h3 className="text-2xl text-base-500">Transaksi penjualan</h3>

			<div className="flex justify-end">
				<NavLink
					to={"/sales"}
					className="px-8 py-2 bg-blue-500 hover:bg-blue-700 rounded-md shadow-md text-white"
				>
					Tambah transaksi
				</NavLink>
			</div>

			<SellingList />

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
