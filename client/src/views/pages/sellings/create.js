import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SellingCart from "./cart";
import ListsProduct from "./lists-product";
import { clearCart } from "../../../redux/features/sellingsCartSlice";
import { rupiah } from "../../../helpers/currency";
import { addSelling } from "../../../redux/features/sellingsSlice";
import SaveTransaction from "./save";

export default function AddSelling() {
	const [grandTotal, setGrandTotal] = useState(0);
	const cart = useSelector((state) => state.sellingCart.cart);
	const dispatch = useDispatch();

	const store = async () => {
		const data = {
			items: cart,
			sellings: {
				grandTotal,
				status: "success",
			},
		};
		if (cart.length) {
			await dispatch(addSelling(data));
			await dispatch(clearCart());
		}
	};

	useEffect(() => {
		setGrandTotal(
			cart.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.qty), 0)
		);
	}, [cart]);

	return (
		<div className="px-8 py-4 overflow-hidden">
			<h3 className="text-2xl text-base-500">Transaksi baru</h3>
			<div className="w-full flex gap-4 justify-end items-center px-4 py-2 bg-base-200">
				<div className="flex flex-1 items-center">
					<ListsProduct />
				</div>

				<SaveTransaction grandTotal={grandTotal} cart={cart} />
				{
					// 	<button
					// 	onClick={store}
					// 	className={`px-6 py-2 rounded shadow-lg text-white ${
					// 		!cart.length ? "bg-gray-400" : "bg-green-500 hover:bg-green-800"
					// 	}`}
					// 	tabIndex={-1}
					// 	disabled={!cart.length}
					// >
					// 	Simpan
					// </button>
				}
				<button
					className={`px-6 py-2 rounded shadow-lg text-white ${
						!cart.length ? "bg-gray-400" : "bg-cyan-500 hover:bg-cyan-700"
					}`}
					tabIndex={-1}
					disabled={!cart.length}
				>
					Hold
				</button>
				<button
					onClick={() => dispatch(clearCart())}
					className={`px-6 py-2 rounded shadow-lg text-white ${
						!cart.length ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-700"
					}`}
					tabIndex={-1}
					disabled={!cart.length}
				>
					Clear
				</button>
				<NavLink
					onClick={() => dispatch(clearCart())}
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
				<span className="text-2xl font-semibold">{rupiah(grandTotal)}</span>
			</div>
		</div>
	);
}
