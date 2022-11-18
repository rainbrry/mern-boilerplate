import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SellingCart from "./cart";
import ListsProduct from "./lists-product";

export default function AddSelling() {
	const cart = useSelector((state) => state.sellings.cart);

	console.log(cart);

	return (
		<div className="px-8 py-4 overflow-hidden">
			<h3 className="text-2xl text-base-500">Transaksi baru</h3>
			<div className="w-full flex gap-4 justify-end items-center px-4 py-2 bg-base-200">
				<div className="flex flex-1 items-center">
					<ListsProduct />
				</div>
				<button
					className={`px-6 py-2 rounded shadow-lg text-white ${
						!cart.length && "bg-gray-400"
					} bg-green-500 hover:bg-green-800`}
					tabIndex={-1}
				>
					Simpan transaksi
				</button>
				<button
					className="px-6 py-2 bg-cyan-500 rounded shadow-lg text-white hover:bg-cyan-700"
					tabIndex={-1}
				>
					Hold transaksi
				</button>
				<button
					// onClick={() => dispatch(clearCart())}
					className="px-6 py-2 bg-yellow-500 rounded shadow-lg text-white hover:bg-yellow-700"
					tabIndex={-1}
				>
					Clear
				</button>
				<NavLink
					to={"/sellings"}
					className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-md shadow-md text-white"
					tabIndex={-1}
				>
					Batal
				</NavLink>
			</div>

			<div>
				<SellingCart />
			</div>

			<div className="flex flex-col items-end px-10  justify-center h-20 rounded-b-xl shadow-lg w-full bg-teal-100">
				<span className="text-2xl font-semibold">Total: Rp. 1.000.000</span>
			</div>
		</div>
	);
}
