import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { rupiah } from "../../../helpers/currency";
import { clearCart } from "../../../redux/features/purchasingsSlice";
import PurchasingCart from "./cart";
import ListsProduct from "./lists-product";

export default function AddPurchasing() {
	const cart = useSelector((state) => state.purchasings.cart);
	const [grandTotal, setGrandTotal] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		setGrandTotal(
			cart.reduce((acc, curr) => acc + Number(curr.purchasePrice) * curr.qty, 0)
		);
	}, [cart]);

	return (
		<div className="px-8 py-4 overflow-hidden">
			<h3 className="text-2xl text-base-500">Transaksi baru</h3>
			<div className="w-full flex gap-4 justify-end items-center px-4 py-2 bg-base-200">
				<div className="flex flex-1 items-center">
					<ListsProduct />
				</div>
				<button className="px-6 py-2 bg-green-600 rounded shadow-lg text-white hover:bg-green-800">
					Simpan transaksi
				</button>
				<button className="px-6 py-2 bg-cyan-500 rounded shadow-lg text-white hover:bg-cyan-700">
					Hold transaksi
				</button>
				<button
					onClick={() => dispatch(clearCart())}
					className="px-6 py-2 bg-yellow-500 rounded shadow-lg text-white hover:bg-yellow-700"
				>
					Clear
				</button>
				<NavLink
					to={"/purchasings"}
					className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-md shadow-md text-white"
				>
					Batal
				</NavLink>
			</div>

			<div>
				<PurchasingCart />
			</div>

			<div className="flex flex-col items-end px-10  justify-center h-20 rounded-b-xl shadow-lg w-full bg-teal-100">
				<div>
					Total: <span className="text-2xl">{rupiah(grandTotal || 0)}</span>
				</div>
			</div>
		</div>
	);
}
